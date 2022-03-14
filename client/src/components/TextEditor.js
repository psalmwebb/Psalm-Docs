import {useCallback, useRef, useContext,useEffect} from "react";
import { SocketContext } from "../contexts/socketContextProvider";
import { DataContext } from "../contexts/dataContextProvider";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {toolbarOptions} from "../util";

export default function TextEditor({defaultContent,docId,setSaveStatus})
{
    const {socketObj} = useContext(SocketContext);
    const {userObj} = useContext(DataContext);

    const s = useRef(0);
    
    const numOfPages = useRef(0);

    function saveDocument(dataObj){
        if(Object.keys(socketObj).length){
            setSaveStatus('saving...')
            socketObj.emit('data',dataObj)
        }
    }

    useEffect(()=>{

        if(!Object.keys(socketObj).length) return

        socketObj.once('docId',(realDocId)=>{
            docId.current = realDocId; // Receive the newly created document id from the server....
        })


        socketObj.on('saved',()=>{
            setSaveStatus('saved');

            clearTimeout(s.current)
        })

        return ()=>{
            socketObj.off('saved',()=>{})
            socketObj.off('docId',()=>{});
        }

    },[Object.keys(socketObj).length])

    const addNewPage = useCallback((container,obj)=>{

       if(container === null) return;

       const page = document.createElement("div");

       page.classList.add('page');
       page.id=`page_${++numOfPages.current}`;


       obj.clearContainer && (()=> container.innerHTML = "")();

       container.appendChild(page);

       let qlEditor = new Quill(page,{
           theme:"snow",
           modules:{
               toolbar:toolbarOptions
           }
       })
//dd
       let qlEditorDiv = page.querySelector('.ql-editor');


       if(obj.defaultHTML)
           qlEditorDiv.innerHTML = obj.defaultHTML;

        saveDocument({
            docId:docId.current,
            data:Array.from(container.querySelectorAll('.ql-editor')).map(editor => editor.innerHTML).join(""),
            userId:userObj.id
        });
      

       page.addEventListener('click',(e)=>{
           const currentPageToolBar = page.previousElementSibling;
           const allPagesToolBar = container.querySelectorAll('.ql-toolbar');

        //    console.log(allPagesToolBar);

        //    console.log(currentPageToolBar);

           allPagesToolBar.forEach(pageToolBar=>{
               pageToolBar.style.zIndex = '1';
           })

           currentPageToolBar.style.zIndex = '50';
       })

       qlEditor.on('text-change',()=>{

        clearTimeout(s.current);

        setSaveStatus('Saving...');
        s.current = setTimeout(()=>{
            saveDocument({
                docId:docId.current,
                data:Array.from(container.querySelectorAll('.ql-editor')).map(editor => editor.innerHTML).join(""),
                userId:userObj.id
            });
        },2000)
        
        // Getting all content in the current page....
    
        let data = qlEditorDiv.innerHTML.replace(/(?<=(p|h[1-6])>)(?=<(p|h[1-6]))/g,'[_]').split('[_]');

        let lastLine;

        if(checkEditorOverFlow(qlEditorDiv)){ // Check if current page has overflown

            // Get the last Line of text
            lastLine = data.pop();
            // console.log(lastLine);
            // Add the remaining text to the current page....
            qlEditorDiv.innerHTML = data.join("").trim();

            // If current page has overflown, we try to get the next page, if next page does not exist we create a new one

            let nextPage = document.querySelector(`#page_${Number(page.id.split('_')[1])+1}`)

            if(nextPage){
                let nextPageEditor = nextPage.querySelector('.ql-editor');

                let nextPageEditorData = nextPageEditor.innerHTML.trim();

                nextPageEditor.innerHTML = lastLine.trim() + nextPageEditorData;
            }
            else{
                addNewPage(container,{
                    clearContainer:false,
                    defaultHTML:lastLine,
                });
            } 

            // qlEditorDiv.scrollHeight = qlEditorDiv.clientHeight;
        }
          
       })

       qlEditor.focus();

    },[])


    function checkEditorOverFlow(editor){
        if((editor.clientHeight - editor.scrollHeight) === 1 ||
        (editor.clientHeight - editor.scrollHeight) === 0 )
        {
          return false;
        }
        else{
          return true;
        }
    }

   


    const containerRef = useCallback((container)=>{
       
        addNewPage(container,
            {
                clearContainer:true,
                defaultHTML:defaultContent
            }
            )
    },[addNewPage,defaultContent])

    return (
        <div className="container" ref={containerRef}></div>
    )
}