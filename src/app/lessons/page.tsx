"use client"
import { GiNotebook } from "react-icons/gi";
import Lesson from "../components/Genlessons";
import { useRouter } from "next/navigation";
export default function lessons() {
    const router = useRouter();
    const navigatehandle =(path: string)=>
    {
        router.push(path);
    }
    return (
        <main style={{display:"flex", minHeight:"100vh"}}>
            <div style={{ flex: 1, padding: "30px", display: "flex", flexDirection: "column", gap: "30px" }}>
                <Lesson
                    path="/lessons"
                    onClick={() => navigatehandle("/lessons")}
                    icon={<GiNotebook size={25} />}
                    label="บทเรียน"
                />
{/*               
                <div style={{
                    backgroundColor:"#7fb3d3", 
                    padding:"20px", 
                    borderRadius:"10px", 
                    textAlign:"center"
                }}>
                    <h1 style={{
                        color:"white", 
                        fontSize:"24px", 
                        fontWeight:"bold", 
                        margin:0
                    }}>
                        บทที่ 1 การทักทายและนำตนเอง
                    </h1>
                </div>

                <div style={{display:"flex", gap:"30px", alignItems:"flex-start"}}>
                    <div style={{
                        backgroundColor:"#a8d5a8", 
                        padding:"40px", 
                        borderRadius:"15px", 
                        flex:1,
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        position:"relative"
                    }}>
                        <button style={{
                            position:"absolute",
                            left:"20px",
                            top:"50%",
                            transform:"translateY(-50%)",
                            backgroundColor:"transparent",
                            border:"none",
                            fontSize:"24px",
                            color:"#666",
                            cursor:"pointer"
                        }}>
                            ‹
                        </button>

                       
                        <div style={{
                            display:"grid",
                            gridTemplateColumns:"repeat(3, 1fr)",
                            gap:"20px",
                            marginBottom:"20px"
                        }}>
                            <button style={{
                                width:"60px",
                                height:"60px",
                                borderRadius:"50%",
                                backgroundColor:"#5dade2",
                                border:"none",
                                color:"white",
                                fontSize:"24px",
                                fontWeight:"bold",
                                cursor:"pointer"
                            }}>1</button>
                            <button style={{
                                width:"60px",
                                height:"60px",
                                borderRadius:"50%",
                                backgroundColor:"#58d68d",
                                border:"none",
                                color:"white",
                                fontSize:"24px",
                                fontWeight:"bold",
                                cursor:"pointer"
                            }}>2</button>
                            <button style={{
                                width:"60px",
                                height:"60px",
                                borderRadius:"50%",
                                backgroundColor:"#58d68d",
                                border:"none",
                                color:"white",
                                fontSize:"24px",
                                fontWeight:"bold",
                                cursor:"pointer"
                            }}>3</button>
                        </div>

                        <div style={{
                            display:"grid",
                            gridTemplateColumns:"repeat(2, 1fr)",
                            gap:"20px"
                        }}>
                            <button style={{
                                width:"60px",
                                height:"60px",
                                borderRadius:"50%",
                                backgroundColor:"#58d68d",
                                border:"none",
                                color:"white",
                                fontSize:"24px",
                                fontWeight:"bold",
                                cursor:"pointer"
                            }}>4</button>
                            <button style={{
                                width:"60px",
                                height:"60px",
                                borderRadius:"50%",
                                backgroundColor:"#58d68d",
                                border:"none",
                                color:"white",
                                fontSize:"24px",
                                fontWeight:"bold",
                                cursor:"pointer"
                            }}>5</button>
                        </div>

                       
                        <button style={{
                            position:"absolute",
                            right:"20px",
                            top:"50%",
                            transform:"translateY(-50%)",
                            backgroundColor:"transparent",
                            border:"none",
                            fontSize:"24px",
                            color:"#666",
                            cursor:"pointer"
                        }}>
                            ›
                        </button>
                    </div>

                   
                    <div style={{display:"flex", flexDirection:"column", gap:"20px", width:"250px"}}>
                
                        <div style={{
                            backgroundColor:"white",
                            padding:"20px",
                            borderRadius:"15px",
                            boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
                        }}>
                            <h3 style={{
                                fontSize:"18px",
                                fontWeight:"bold",
                                margin:"0 0 10px 0"
                            }}>
                                บทเรียนที่ 1
                            </h3>
                            <p style={{
                                color:"#666",
                                margin:0,
                                fontSize:"14px"
                            }}>
                                หน่วยที่ 1 / 5
                            </p>
                        </div>

                        <div style={{
                            backgroundColor:"white",
                            padding:"20px",
                            borderRadius:"15px",
                            boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
                        }}>
                            <h3 style={{
                                fontSize:"18px",
                                fontWeight:"bold",
                                margin:"0 0 10px 0"
                            }}>
                                ตารางคะแนน
                            </h3>
                            <p style={{
                                color:"#666",
                                margin:0,
                                fontSize:"14px"
                            }}>
                                คุณอยู่อันดับ
                            </p>
                            <p style={{
                                fontSize:"24px",
                                fontWeight:"bold",
                                color:"#f39c12",
                                margin:"5px 0 0 0"
                            }}>
                                #36
                            </p>
                        </div>
                    </div> */}
                {/* </div> */}
            </div>
        </main>
    );
}
