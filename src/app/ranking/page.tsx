"use client";
import "./ranking.css";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../axios";

interface UserRank {
  id: number;
  username: string;
  point: number;
  rank: number | string;
}

export default function Ranking() {
  const [leaderboard, setLeaderboard] = useState<UserRank[]>([]);
  const [currentUser, setCurrentUser] = useState<UserRank | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/leaderboard");
        if (res.data.success) {
          setLeaderboard(res.data.leaderboard);
          setCurrentUser(res.data.current_user);
        }
      } catch (err) {
        console.error("Error loading leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, []);

  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="ranking-bg">
      <div className="ranking-top3-box">
        {top3.map((user, index) => (
          <div key={user.id} className={`ranking-top ranking-top${index + 1}`}>
            <div className="ranking-avatar">
              <FaUser size={65} color="#333" />
            </div>
            <div className="ranking-label">#{user.rank} {user.username}</div>
          </div>
        ))}
      </div>

      <div className="ranking-table-container">
        <div className="ranking-table">
          {others.map((user) => (
            <div key={user.id} className="ranking-row">
              #{user.rank} {user.username}
            </div>
          ))}
        </div>
      </div>

      {currentUser && (
        <div className="ranking-fixed-your">
          Your Rank #{currentUser.rank} {currentUser.username}
        </div>
      )}
    </div>
  );
}