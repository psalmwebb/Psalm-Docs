import html2pdf from './scripts/html2pdf';

export const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [ 'link', 'image', 'video', 'formula' ], // image, video, formula support
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  


export const generatePDF = function(obj){
    html2pdf(obj.html, {
      margin:       0,
      filename:     `${obj.filename}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, logging: false, dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  });
} 



export const generateDOCX = async function(obj){

  let res = await fetch(obj.url,{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({html:obj.html})
  })

  let data = await res.json();

  // console.log(data);

  let a = document.createElement('a');

  a.href=`data:application/msword;base64,${data.pdfString}`;

  a.download = `${obj.filename}.docx`;

  a.click();

}