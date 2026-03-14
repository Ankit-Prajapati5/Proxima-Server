import axios from "axios"

export const aiHelper = async (req,res)=>{

try{

const {code,language,action,problemNo}=req.body

let instruction=""

if(action==="run"){

instruction=`
You are a strict compiler.

Language: ${language}

Code:
${code}

Return ONLY in this format:

🧾 OUTPUT
<program output>

❌ ERROR
<error message or NONE>

⚡ TIME COMPLEXITY
<estimated complexity>

No explanations.
`

}

if(action==="explain"){

instruction=`
Explain the following ${language} code.

Code:
${code}

Return format:

📌 SUMMARY
<short explanation>

🪜 STEPS
• step 1
• step 2
• step 3

⚡ TIME COMPLEXITY
<complexity>

💾 SPACE COMPLEXITY
<complexity>
`

}

if(action==="bug"){

instruction=`
Find bugs in the following ${language} code.

Code:
${code}

Return format:

🐞 BUG
<problem>

🛠 FIXED CODE
<correct code>

⚡ TIME COMPLEXITY
<complexity>
`

}

if(action==="optimize"){

instruction=`
Optimize this ${language} code.

Code:
${code}

Return format:

🚀 OPTIMIZED CODE
<code>

📈 IMPROVEMENT
<reason>

⚡ TIME COMPLEXITY
<complexity>

💾 SPACE COMPLEXITY
<complexity>
`

}

if(action==="testcases"){

instruction=`
Generate test cases for the following ${language} code.

Code:
${code}

Return format:

🧪 TEST CASES

| Case | Input | Output |
|------|------|------|
| 1 | ... | ... |
| 2 | ... | ... |
| 3 | ... | ... |
`

}

if(action==="leetcode"){

instruction=`
Generate LeetCode problem number ${problemNo}

STRICT RULES:
• Do NOT write introduction
• Do NOT write suggestions
• Do NOT say "Here is the problem"
• Do NOT use markdown formatting
• Only return the structure below

Return format:

🧩 TITLE
<title>

📘 DESCRIPTION
<problem description>

🧪 EXAMPLE

Input:
<input>

Output:
<output>

Explanation:
<short explanation>

📏 CONSTRAINTS
• constraint 1
• constraint 2
• constraint 3
`

}

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"deepseek/deepseek-chat",
messages:[{role:"user",content:instruction}]
},
{
headers:{
Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type":"application/json"
}
}
)

let result=response.data.choices[0].message.content


// 🔧 CLEAN RESPONSE
result=result
.replace(/Here.*$/gi,"")
.replace(/Let me know.*$/gi,"")
.replace(/```/g,"")
.replace(/\*\*/g,"")
.replace(/---/g,"")
.replace(/`/g,"")
.trim()


res.json({result})

}catch(err){

console.log(err)

res.status(500).json({
result:"AI Error"
})

}

}