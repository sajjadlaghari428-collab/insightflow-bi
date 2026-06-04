import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const revenueData = [
  {month:"Jan",revenue:142,target:150},{month:"Feb",revenue:168,target:175},
  {month:"Mar",revenue:155,target:175},{month:"Apr",revenue:210,target:200},
  {month:"May",revenue:198,target:210},{month:"Jun",revenue:245,target:225},
  {month:"Jul",revenue:232,target:240},{month:"Aug",revenue:270,target:260},
  {month:"Sep",revenue:258,target:270},{month:"Oct",revenue:284,target:280},
  {month:"Nov",revenue:310,target:300},{month:"Dec",revenue:295,target:310},
];

const productData = [
  {product:"Analytics Pro",sales:4200,revenue:84000},
  {product:"Dashboard Lite",sales:3100,revenue:46500},
  {product:"Data Suite",sales:2800,revenue:98000},
  {product:"Reports API",sales:1900,revenue:28500},
  {product:"Mobile App",sales:3600,revenue:54000},
  {product:"Enterprise",sales:900,revenue:135000},
];

const regionData = [
  {region:"North America",revenue:38,color:"#4f8ef7",flag:"🇺🇸",amount:"$108K"},
  {region:"Europe",revenue:27,color:"#22d3a0",flag:"🇪🇺",amount:"$77K"},
  {region:"Asia Pacific",revenue:22,color:"#a78bfa",flag:"🌏",amount:"$63K"},
  {region:"Middle East",revenue:8,color:"#f59e0b",flag:"🌍",amount:"$23K"},
  {region:"Other",revenue:5,color:"#f87171",flag:"🌎",amount:"$14K"},
];

const channelData = [
  {name:"Direct",value:38,color:"#4f8ef7"},
  {name:"Organic",value:27,color:"#22d3a0"},
  {name:"Paid Ads",value:22,color:"#a78bfa"},
  {name:"Referral",value:13,color:"#f59e0b"},
];

const campaigns = [
  {name:"Summer Sale 2025",budget:"$12,400",roas:"4.2x",status:"Active"},
  {name:"Brand Awareness Q2",budget:"$8,200",roas:"3.8x",status:"Active"},
  {name:"Retargeting Flow",budget:"$5,600",roas:"6.1x",status:"Active"},
  {name:"Email Nurture",budget:"$2,100",roas:"—",status:"Pending"},
  {name:"Influencer Drive",budget:"$9,800",roas:"2.3x",status:"Paused"},
];

const periods = {
  "7D":  {rev:"$67K",  users:"3,210",  conv:"3.92%", aov:"$64.20"},
  "30D": {rev:"$284K", users:"12,847", conv:"3.71%", aov:"$67.40"},
  "90D": {rev:"$812K", users:"38,420", conv:"4.10%", aov:"$71.80"},
  "1Y":  {rev:"$3.2M", users:"142,000",conv:"3.88%", aov:"$69.50"},
};

const S = {
  app: {background:"#0a0e1a",minHeight:"100vh",color:"#f0f4ff",fontFamily:"'DM Sans',sans-serif"},
  topbar: {display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:"1px solid #1e2d45",background:"#111827",flexWrap:"wrap",gap:10},
  logo: {display:"flex",alignItems:"center",gap:10},
  logoIcon: {width:36,height:36,background:"linear-gradient(135deg,#4f8ef7,#a78bfa)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,flexShrink:0},
  tabs: {display:"flex",background:"#111827",borderBottom:"1px solid #1e2d45",padding:"0 20px",overflowX:"auto"},
  tab: (active) => ({padding:"12px 16px",fontSize:13,fontWeight:500,cursor:"pointer",borderBottom:`2px solid ${active?"#4f8ef7":"transparent"}`,color:active?"#4f8ef7":"#6b7fa3",whiteSpace:"nowrap",transition:".2s"}),
  main: {padding:"16px 20px",display:"flex",flexDirection:"column",gap:14},
  card: {background:"#111827",border:"1px solid #1e2d45",borderRadius:12,padding:"18px 20px"},
  cardHeader: {display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14},
  cardTitle: {fontSize:13,fontWeight:600},
  badge: (color) => ({fontSize:10,fontFamily:"monospace",color:color||"#4f8ef7",background:`${color||"#4f8ef7"}22`,borderRadius:4,padding:"3px 8px"}),
  kpiGrid: {display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10},
  kpi: (color) => ({background:"#111827",border:"1px solid #1e2d45",borderRadius:12,padding:"16px 18px",borderTop:`2px solid ${color}`}),
  kpiLabel: {fontSize:10,color:"#6b7fa3",textTransform:"uppercase",letterSpacing:".8px",fontFamily:"monospace"},
  kpiVal: {fontSize:24,fontWeight:600,margin:"6px 0 4px",letterSpacing:-1},
  midGrid: {display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14},
  statusPill: (s) => {
    const map = {Active:{bg:"rgba(34,211,160,.15)",color:"#22d3a0"},Pending:{bg:"rgba(245,158,11,.15)",color:"#f59e0b"},Paused:{bg:"rgba(248,113,113,.15)",color:"#f87171"}};
    const c = map[s]||map.Paused;
    return {background:c.bg,color:c.color,padding:"3px 10px",borderRadius:10,fontSize:10,fontWeight:600};
  },
  footer: {padding:"12px 20px",borderTop:"1px solid #1e2d45",background:"#111827",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,fontSize:11,color:"#6b7fa3",fontFamily:"monospace"},
  mobileMenu: {display:"flex",gap:6,overflowX:"auto",padding:"10px 20px",background:"#111827",borderBottom:"1px solid #1e2d45"},
};

const tooltipStyle = {contentStyle:{background:"#1a2235",border:"1px solid #1e2d45",borderRadius:8,fontSize:11},labelStyle:{color:"#6b7fa3"}};

export default function App() {
  const [period, setPeriod] = useState("30D");
  const [activeTab, setActiveTab] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const d = periods[period];

  return (
    <div style={S.app}>

      {/* Topbar */}
      <div style={S.topbar}>
        <div style={S.logo}>
          <div style={S.logoIcon}>BI</div>
          <div>
            <div style={{fontSize:15,fontWeight:600}}>InsightFlow</div>
            <div style={{fontSize:10,color:"#6b7fa3",fontFamily:"monospace"}}>Analytics Dashboard</div>
          </div>
        </div>

        {/* Period buttons - hide on very small */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["7D","30D","90D","1Y"].map(p=>(
            <button key={p} onClick={()=>setPeriod(p)} style={{
              background:period===p?"rgba(79,142,247,.15)":"transparent",
              color:period===p?"#4f8ef7":"#6b7fa3",
              border:`1px solid ${period===p?"#4f8ef7":"#1e2d45"}`,
              borderRadius:20,padding:"5px 12px",fontSize:11,cursor:"pointer"
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {["Overview","Revenue","Products","Regions","Campaigns"].map(t=>(
          <div key={t} style={S.tab(activeTab===t)} onClick={()=>setActiveTab(t)}>{t}</div>
        ))}
      </div>

      <div style={S.main}>

        {/* KPI Cards */}
        <div style={S.kpiGrid}>
          {[
            {label:"Total Revenue",val:d.rev,change:"↑ 18.2%",up:true,color:"#4f8ef7"},
            {label:"Active Users",val:d.users,change:"↑ 9.4%",up:true,color:"#22d3a0"},
            {label:"Conversion",val:d.conv,change:"↓ 0.3%",up:false,color:"#f59e0b"},
            {label:"Avg Order",val:d.aov,change:"↑ 5.8%",up:true,color:"#a78bfa"},
          ].map(k=>(
            <div key={k.label} style={S.kpi(k.color)}>
              <div style={S.kpiLabel}>{k.label}</div>
              <div style={S.kpiVal}>{k.val}</div>
              <div style={{fontSize:11,color:k.up?"#22d3a0":"#f87171"}}>{k.change} vs last period</div>
            </div>
          ))}
        </div>

        {/* Line Chart + Pie */}
        <div style={S.midGrid}>
          <div style={S.card}>
            <div style={S.cardHeader}>
              <div style={S.cardTitle}>Monthly Revenue Trend</div>
              <div style={S.badge()}>LIVE</div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" tick={{fill:"#6b7fa3",fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:"#6b7fa3",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}K`}/>
                <Tooltip {...tooltipStyle}/>
                <Line type="monotone" dataKey="revenue" stroke="#4f8ef7" strokeWidth={2} dot={false} name="Revenue"/>
                <Line type="monotone" dataKey="target" stroke="#22d3a0" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Target"/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={S.card}>
            <div style={S.cardHeader}>
              <div style={S.cardTitle}>Revenue by Channel</div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={2}>
                  {channelData.map((c,i)=><Cell key={i} fill={c.color}/>)}
                </Pie>
                <Tooltip {...tooltipStyle}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px",marginTop:8}}>
              {channelData.map(c=>(
                <div key={c.name} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0"}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,color:"#6b7fa3"}}>
                    <div style={{width:7,height:7,borderRadius:2,background:c.color,flexShrink:0}}></div>{c.name}
                  </div>
                  <div style={{fontFamily:"monospace",fontWeight:700}}>{c.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BAR CHART — Product Sales */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <div style={S.cardTitle}>Product Sales & Revenue</div>
            <div style={S.badge("#22d3a0")}>6 PRODUCTS</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={productData} barGap={4}>
              <XAxis dataKey="product" tick={{fill:"#6b7fa3",fontSize:9}} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="left" tick={{fill:"#6b7fa3",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}K`}/>
              <YAxis yAxisId="right" orientation="right" tick={{fill:"#6b7fa3",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}K`}/>
              <Tooltip {...tooltipStyle}/>
              <Bar yAxisId="left" dataKey="sales" fill="#4f8ef7" radius={[4,4,0,0]} name="Units Sold"/>
              <Bar yAxisId="right" dataKey="revenue" fill="#a78bfa" radius={[4,4,0,0]} name="Revenue $"/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:16,marginTop:8,justifyContent:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7fa3"}}>
              <div style={{width:10,height:10,borderRadius:2,background:"#4f8ef7"}}></div>Units Sold
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7fa3"}}>
              <div style={{width:10,height:10,borderRadius:2,background:"#a78bfa"}}></div>Revenue
            </div>
          </div>
        </div>

        {/* MAP VIEW — Region Revenue */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <div style={S.cardTitle}>🌍 Revenue by Region</div>
            <div style={S.badge("#f59e0b")}>GLOBAL</div>
          </div>

          {/* World Map Visual */}
          <div style={{background:"#0d1524",borderRadius:10,padding:"16px",marginBottom:14,position:"relative",overflow:"hidden"}}>
            <div style={{textAlign:"center",marginBottom:10}}>
              <svg viewBox="0 0 800 400" style={{width:"100%",maxHeight:200,opacity:.9}}>
                {/* Simple world map dots */}
                {[
                  // North America
                  [120,130],[140,140],[160,130],[180,140],[200,130],[220,140],[240,130],[130,150],[150,160],[170,155],[190,160],[210,150],[230,155],[160,170],[180,175],[200,170],
                  // Europe
                  [360,100],[380,100],[400,100],[370,115],[390,110],[410,110],[360,125],[380,120],[400,120],[385,130],
                  // Africa
                  [370,160],[390,155],[410,160],[380,175],[400,170],[420,175],[370,190],[390,185],[410,190],[380,205],[400,200],[390,215],
                  // Asia
                  [440,90],[470,85],[500,90],[530,85],[560,90],[590,85],[450,105],[480,100],[510,105],[540,100],[570,105],[600,100],[460,120],[490,115],[520,120],[550,115],[580,120],[610,115],[470,135],[500,130],[530,135],[560,130],[590,135],
                  // South America
                  [190,210],[210,205],[230,210],[200,225],[220,220],[240,225],[210,240],[230,235],[220,255],[215,270],
                  // Australia
                  [580,200],[610,195],[640,200],[600,215],[630,210],[590,225],[620,220],
                ].map(([x,y],i)=>(
                  <circle key={i} cx={x} cy={y} r={2.5} fill={
                    x<280?"#4f8ef7":x<430?"#22d3a0":x<500&&y<160?"#a78bfa":"#374151"
                  } opacity={0.7}/>
                ))}
                {/* Region Labels */}
                <text x="170" y="200" fill="#4f8ef7" fontSize="11" fontWeight="600" textAnchor="middle">N. America</text>
                <text x="390" y="145" fill="#22d3a0" fontSize="11" fontWeight="600" textAnchor="middle">Europe</text>
                <text x="530" y="155" fill="#a78bfa" fontSize="11" fontWeight="600" textAnchor="middle">Asia Pacific</text>
                <text x="390" y="240" fill="#f59e0b" fontSize="11" fontWeight="600" textAnchor="middle">Middle East</text>
                <text x="210" y="290" fill="#6b7fa3" fontSize="10" textAnchor="middle">S. America</text>
                <text x="610" y="250" fill="#6b7fa3" fontSize="10" textAnchor="middle">Australia</text>
                {/* Pulse circles on major cities */}
                <circle cx="170" cy="150" r="8" fill="none" stroke="#4f8ef7" strokeWidth="1.5" opacity="0.6"/>
                <circle cx="390" cy="115" r="7" fill="none" stroke="#22d3a0" strokeWidth="1.5" opacity="0.6"/>
                <circle cx="530" cy="120" r="7" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6"/>
              </svg>
            </div>
          </div>

          {/* Region Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
            {regionData.map(r=>(
              <div key={r.region} style={{background:"#0d1524",borderRadius:8,padding:"12px 14px",border:"1px solid #1e2d45"}}>
                <div style={{fontSize:18,marginBottom:4}}>{r.flag}</div>
                <div style={{fontSize:11,color:"#6b7fa3",marginBottom:2}}>{r.region}</div>
                <div style={{fontSize:16,fontWeight:600,color:r.color}}>{r.amount}</div>
                <div style={{marginTop:8,height:4,background:"#1e2d45",borderRadius:2}}>
                  <div style={{height:"100%",width:`${r.revenue}%`,background:r.color,borderRadius:2,transition:".5s"}}></div>
                </div>
                <div style={{fontSize:10,color:"#6b7fa3",marginTop:3,fontFamily:"monospace"}}>{r.revenue}% of total</div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaigns Table */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <div style={S.cardTitle}>Active Campaigns</div>
            <div style={S.badge()}>6 RUNNING</div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:400}}>
              <thead>
                <tr style={{borderBottom:"1px solid #1e2d45"}}>
                  {["Campaign","Budget","ROAS","Status"].map(h=>(
                    <th key={h} style={{textAlign:"left",padding:"0 0 10px",color:"#6b7fa3",fontFamily:"monospace",fontSize:10,textTransform:"uppercase",letterSpacing:".6px"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map(c=>(
                  <tr key={c.name} style={{borderBottom:"1px solid rgba(30,45,69,.4)"}}>
                    <td style={{padding:"10px 0"}}>{c.name}</td>
                    <td style={{padding:"10px 0",fontFamily:"monospace"}}>{c.budget}</td>
                    <td style={{padding:"10px 0",fontFamily:"monospace",color:"#4f8ef7"}}>{c.roas}</td>
                    <td style={{padding:"10px 0"}}><span style={S.statusPill(c.status)}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={S.footer}>
        <div>⬤ Live · Last synced just now</div>
        <div>InsightFlow BI · React + Recharts · Portfolio Project</div>
      </div>
    </div>
  );
}