import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GITHUB_USERNAME = "ankushsingh003";

const FEATURED_REPOS = [
  "safe-shop",
  "deepchain",
  "botocop",
  "Stochastic-Volatility-Indian-Equity",
  "Aegis-Hedge-Systems"
];

const App = () => {
  const [time, setTime] = useState(new Date());
  const [repos, setRepos] = useState([]);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all repositories on mount
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        // Filter to only include the specific featured repositories
        const filtered = response.data.filter(repo => 
          FEATURED_REPOS.some(featured => repo.name.toLowerCase() === featured.toLowerCase())
        );
        setRepos(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setLoading(false);
      }
    };
    fetchRepos();
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (title, type, data = null) => {
    if (!openWindows.find(w => w.title === title)) {
      setOpenWindows([...openWindows, { title, type, data, id: Date.now() }]);
    }
    setActiveWindow(title);
  };

  const closeWindow = (title) => {
    setOpenWindows(openWindows.filter(w => w.title !== title));
    if (activeWindow === title) setActiveWindow(null);
  };

  return (
    <div className="desktop">
      <div className="glass-overlay"></div>

      {/* Menu Bar */}
      <div className="menu-bar">
        <div className="menu-left">
          <span style={{ fontSize: '18px', padding: '0 5px' }}></span>
          <span style={{ fontWeight: 700 }}>Finder</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
        </div>
        <div className="menu-right">
          <span>Wi-Fi</span>
          <span>100%</span>
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="desktop-icons">
        {loading ? (
          <div style={{ color: 'white', padding: '20px' }}>Loading Projects...</div>
        ) : (
          repos.map(repo => (
            <div key={repo.id} className="desktop-icon" onDoubleClick={() => openWindow(repo.name, "folder", repo)}>
              <div style={{ fontSize: '45px' }}>📂</div>
              <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{repo.name}</span>
            </div>
          ))
        )}
        <div className="desktop-icon" onDoubleClick={() => openWindow("About Me", "file")}>
          <div style={{ fontSize: '45px' }}>📄</div>
          <span>About Me.pdf</span>
        </div>
      </div>

      {/* Windows */}
      {openWindows.map((win) => (
        <MacWindow 
          key={win.id}
          window={win}
          isActive={activeWindow === win.title}
          onClose={() => closeWindow(win.title)}
          onFocus={() => setActiveWindow(win.title)}
          openWindow={openWindow}
        />
      ))}

      {/* Dock */}
      <div className="dock-container">
        <div className="dock">
          <div className="dock-icon" style={{ background: '#4A90E2' }}>🧭</div>
          <div className="dock-icon" style={{ background: '#000' }} onClick={() => openWindow("Terminal", "terminal")}>{">_"}</div>
          <div className="dock-icon" style={{ background: '#D0021B' }}>✉️</div>
          <div className="dock-icon" style={{ background: '#F5A623' }} onClick={() => openWindow("About Me", "file")}>👤</div>
        </div>
      </div>
    </div>
  );
};

const MacWindow = ({ window, onClose, onFocus, isActive, openWindow }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  // 2. Fetch files inside a folder
  useEffect(() => {
    if (window.type === "folder" && window.data) {
      setLoading(true);
      axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${window.data.name}/contents`)
        .then(res => {
          setFiles(res.data);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    }
    
    // 3. Fetch file content
    if (window.type === "code" && window.data) {
      setLoading(true);
      axios.get(window.data.download_url)
        .then(res => {
          setCode(typeof res.data === 'object' ? JSON.stringify(res.data, null, 2) : res.data);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    }
  }, [window]);

  return (
    <div 
      className={`window ${window.type === 'code' ? 'code-window' : ''}`}
      style={{ 
        zIndex: isActive ? 200 : 100,
        width: window.type === 'code' ? '700px' : '800px',
        height: window.type === 'code' ? '600px' : '500px',
        left: window.type === 'code' ? '300px' : '200px',
        top: window.type === 'code' ? '150px' : '100px'
      }}
      onClick={onFocus}
    >
      <div className="window-header">
        <div className="window-controls">
          <div className="control close" onClick={onClose}></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
        <div className="window-title">{window.title}</div>
      </div>
      <div className="window-body">
        {window.type === "folder" && (
          <div className="sidebar">
            <div className="sidebar-item active">All Files</div>
            <div className="sidebar-item">Branches</div>
            <div className="sidebar-item">Commits</div>
          </div>
        )}
        <div className="content-area" style={{ color: 'white', padding: '20px' }}>
           {loading ? (
             <div>Loading...</div>
           ) : window.type === "folder" ? (
             <div className="file-grid">
               {files.map((file, i) => (
                 <div key={i} className="file-item" onDoubleClick={() => openWindow(file.name, "code", file)}>
                   <div style={{ fontSize: '30px' }}>{file.type === 'dir' ? '📂' : '📄'}</div>
                   <span className="file-name">{file.name}</span>
                 </div>
               ))}
             </div>
           ) : window.type === "code" ? (
             <pre style={{ 
               fontFamily: 'monospace', 
               fontSize: '13px', 
               overflow: 'auto', 
               height: '100%',
               color: '#d4d4d4'
             }}>
               <code>{code}</code>
             </pre>
           ) : (
             <div style={{ color: '#0f0', fontFamily: 'monospace' }}>
                <p>ankush@macbook ~ % system active</p>
                <p>Uvicorn running on http://127.0.0.1:8000</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default App;
