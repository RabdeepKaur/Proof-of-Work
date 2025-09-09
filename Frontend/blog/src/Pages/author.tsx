import MDEditor from '@uiw/react-md-editor/nohighlight';
import React,{useState} from "react";

const code = `**Hello world!!!**
\`\`\`js
function demo() {}
\`\`\`
`

function author(){
  const [title,setTitle]=useState("");
  const[content,setContent]=useState('Write your blog....')
  const [value, setValue] = React.useState("**Hello world!!!**");

  const handleSave=async()=>{
    const blogData={title,content};
    try{
      const response= await fetch("",{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(blogData),
      });
      if(response.ok){
        alert('Blog saved successfully');
        setTitle('');
        setContent('');
      }else{
        alert('Error saving blog')
      }
    }
    catch(error){
      console.error(error);
      alert('Something went wrong ')
    }
  }
    return(
        <>
           <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Write a Blog</h1>
      <input
        type="text"
        placeholder="Enter blog title"
        className="border p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MDEditor value={content} onChange={(val) => setContent(val ?? '')} />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Save Blog
      </button>
    </div>
        </>
    )
}
export default author;