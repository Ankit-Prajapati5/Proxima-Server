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
background:white;
display:flex;
justify-content:center;
align-items:center;
}

/* certificate container */

.certificate{

width:1120px;
height:760px;
border:12px solid #facc15;
border-radius:28px;
padding:70px;
text-align:center;
position:relative;
overflow:hidden;
background:#fffdf5;

}

/* golden background */

.bg{

position:absolute;
inset:0;
background:linear-gradient(135deg,#fde047,#fcd34d,#facc15);
opacity:0.25;

}

/* ribbon */

.ribbon{

position:absolute;
top:0;
left:0;
background:#eab308;
color:white;
padding:7px 20px;
font-size:12px;
font-weight:900;
letter-spacing:2px;

}

/* gold seal */

.seal{

position:absolute;
top:40px;
right:40px;
background:linear-gradient(135deg,#facc15,#f97316);
color:white;
width:60px;
height:60px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
font-size:26px;

}

/* PROXIMA */

.proxima{

font-size:36px;
font-weight:900;
color:#ca8a04;
letter-spacing:4px;

}

/* title */

.title{

font-size:44px;
font-weight:900;
margin-top:10px;

}

/* subtitle */

.subtitle{

margin-top:15px;
letter-spacing:2px;
font-weight:700;
color:#71717a;
font-size:14px;

}

/* name */

.name{

font-size:52px;
color:#2563eb;
margin-top:25px;
font-weight:900;

}

/* course */

.course{

font-size:26px;
margin-top:12px;
font-weight:700;

}

/* footer */

.footer{

display:flex;
justify-content:space-between;
align-items:center;
margin-top:55px;

}

.info{

text-align:left;

}

.label{

font-size:11px;
letter-spacing:2px;
color:#a1a1aa;
font-weight:900;

}

.value{

font-weight:700;
margin-bottom:10px;
font-size:14px;

}

.issued{

display:flex;
align-items:center;
gap:6px;
font-size:14px;

}

/* QR */

.qr img{

width:110px;
height:110px;

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

<p style="margin-top:10px;font-size:16px;">
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