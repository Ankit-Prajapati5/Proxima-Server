export const certificateTemplate = ({
  name,
  course,
  certificateId,
  issueDate,
  verifyUrl
}) => {

return `
<html>

<head>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
font-family:Arial, sans-serif;
display:flex;
justify-content:center;
align-items:center;
background:white;
}

/* container */

.certificate{

width:1080px;          /* smaller */
height:720px;          /* smaller */
border:10px solid #facc15;
border-radius:25px;
padding:55px;
text-align:center;
position:relative;
overflow:hidden;

}

/* background gradient */

.bg{
position:absolute;
inset:0;
background:linear-gradient(135deg,#fde047,#fed7aa,#facc15);
opacity:0.12;
}

/* ribbon */

.ribbon{
position:absolute;
top:0;
left:0;
background:#eab308;
color:white;
padding:5px 16px;
font-size:10px;
font-weight:900;
letter-spacing:2px;
}

/* gold seal */

.seal{
position:absolute;
top:30px;
right:30px;
background:linear-gradient(135deg,#facc15,#f97316);
color:white;
width:50px;
height:50px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
font-size:22px;
}

/* heading */

.proxima{
font-size:28px;
font-weight:900;
color:#ca8a04;
letter-spacing:3px;
}

.title{
font-size:36px;
font-weight:900;
margin-top:6px;
}

.subtitle{
margin-top:10px;
letter-spacing:2px;
font-weight:700;
color:#71717a;
font-size:12px;
}

.name{
font-size:42px;
color:#2563eb;
margin-top:18px;
font-weight:900;
}

.course{
font-size:20px;
margin-top:8px;
font-weight:700;
}

/* footer */

.footer{
display:flex;
justify-content:space-between;
align-items:center;
margin-top:35px;
}

.info{
text-align:left;
}

.label{
font-size:10px;
letter-spacing:2px;
color:#a1a1aa;
font-weight:900;
}

.value{
font-weight:700;
margin-bottom:6px;
font-size:12px;
}

.issued{
display:flex;
align-items:center;
gap:5px;
font-size:12px;
}

.qr img{
width:90px;
height:90px;
}

</style>

</head>

<body>

<div class="certificate">

<div class="bg"></div>

<div class="ribbon">
ACHIEVEMENT UNLOCKED
</div>

<div class="seal">
🏅
</div>

<div class="proxima">
PROXIMA
</div>

<div class="title">
Certificate of Completion
</div>

<div class="subtitle">
THIS CERTIFICATE IS PROUDLY PRESENTED TO
</div>

<div class="name">
${name}
</div>

<p style="margin-top:8px;font-size:14px;">
for successfully completing the course
</p>

<div class="course">
${course}
</div>

<div class="footer">

<div class="info">

<div class="label">CERTIFICATE ID</div>
<div class="value">${certificateId}</div>

<div class="label">ISSUE DATE</div>
<div class="value">${issueDate}</div>

<div class="label">ISSUED BY</div>

<div class="issued">
PROXIMA ✔
</div>

</div>

<div class="qr">

<img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${verifyUrl}"/>

</div>

</div>

</div>

</body>

</html>
`;
};