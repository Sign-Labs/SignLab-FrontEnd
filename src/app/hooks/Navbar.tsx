
import "./css/central.css";
import "./css/container.css";
import "./css/component.css";
export default function Nav()
{
    return (
        <aside style={{
        backgroundColor:"white", 
        width:"auto", 
        padding:"20px", 
        display:"flex", 
        flexDirection:"column", 
        gap:"15px"
    }}>
        <h1 className="font_heading bold">
            Sign Lab
        </h1>
        
        <nav style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <a href="/lessons" style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"#3498db",
                display:"flex",
                alignItems:"center",
                gap:"10px"
            }}>
                🏠 บทเรียน
            </a>
            <a href="/vocabulary" style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"rgba(255,255,255,0.1)",
                display:"flex",
                alignItems:"center",
                gap:"10px"
            }}>
                💬 คำศัพท์
            </a>
            <a href="/leaderboard" style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"rgba(255,255,255,0.1)",
                display:"flex",
                alignItems:"center",
                gap:"10px"
            }}>
                🌿 ตารางคะแนน
            </a>
            <a href="/profile" style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"rgba(255,255,255,0.1)",
                display:"flex",
                alignItems:"center",
                gap:"10px"
            }}>
                � โปรไฟล์
            </a>
        </nav>
    </aside>);
}