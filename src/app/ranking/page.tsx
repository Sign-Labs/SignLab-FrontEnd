"use client";
import "./ranking.css";

export default function Ranking() {
  return (
    <div className="ranking-bg">
      <div className="ranking-top3-box">
        <div className="ranking-top ranking-top1">
          <div className="ranking-avatar" />
          <div className="ranking-label">#1 John Doe</div>
        </div>
        <div className="ranking-top ranking-top2">
          <div className="ranking-avatar" />
          <div className="ranking-label">#2 John Doe</div>
        </div>
        <div className="ranking-top ranking-top3">
          <div className="ranking-avatar" />
          <div className="ranking-label">#3 John Doe</div>
        </div>
      </div>
      <div className="ranking-table-container">
        <div className="ranking-table">
          <div className="ranking-row">#4 John Doe</div>
          <div className="ranking-row">#5 John Doe</div>
          <div className="ranking-row">#6 John Doe</div>
          <div className="ranking-row">#7 John Doe</div>
          <div className="ranking-row">#8 John Doe</div>
          <div className="ranking-row">#9 John Doe</div>
          <div className="ranking-row">#10 John Doe</div>
          <div className="ranking-row">#11 John Doe</div>
          <div className="ranking-row">#12 John Doe</div>
          <div className="ranking-row">#13 John Doe</div>
          <div className="ranking-row">#14 John Doe</div>
        </div>
      </div>
      <div className="ranking-fixed-your">Your Rank #36 ThirdTZ</div>
    </div>
  );
}