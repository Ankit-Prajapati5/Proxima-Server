import axios from "axios"

export const askAIDoubt = async (req,res)=>{

 try{

  const {messages} = req.body

  if(!messages){
   return res.status(400).json({
    message:"messages array required"
   })
  }

  const response = await axios.post(

   "https://openrouter.ai/api/v1/chat/completions",

   {
    model:"openai/gpt-3.5-turbo",
    messages:messages
   },

   {
    headers:{
     Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
     "Content-Type":"application/json"
    }
   }

  )

  res.json({
   answer:response.data.choices[0].message.content
  })

 }catch(error){

  console.log("AI ERROR:",error.response?.data || error.message)

  res.status(500).json({
   message:"AI failed"
  })

 }

}