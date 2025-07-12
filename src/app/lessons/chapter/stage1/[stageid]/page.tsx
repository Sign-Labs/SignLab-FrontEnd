"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigation } from '@/app/hooks/useNavigation';
import '@/app/css/component.css';
import '@/app/css/container.css';


export default function Stage() {
    const [showGate, setShowGate] = useState(true);
    const [progress, setProgress] = useState(0);
    const params = useParams();
    const router = useRouter();
    const stageId = parseInt(params.stageid as string);

    return (
        <main className='container_outer' style={{backgroundColor:"red"}}>
           <div className="login_container_top">
            <button onClick={() => window.history.back()} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>
                <AiOutlineLeft size={35} className="back-button " />
            </button>
            <h1 className="icon_size white">เข้าสู่ระบบ</h1>
      </div>
        </main>
    );

}