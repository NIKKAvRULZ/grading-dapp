import { useState } from 'react';
import { ethers } from 'ethers';
import GradingABI from './GradingABI.json';

// --- CONFIGURATION ---
// This is the address you deployed to Sepolia
const CONTRACT_ADDRESS = "0x74AdfE524739932A54F92C33fBb0B30d1f9CB099"; 

function App() {
  // State variables to hold form data
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState(""); 
  const [retrievedGrade, setRetrievedGrade] = useState(null);

  // Helper: Connect to MetaMask
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // --- FUNCTION 1: WRITE TO BLOCKCHAIN ---
  async function handleSubmit() {
    if (!studentId || !courseId || !score) {
        alert("Please fill in all fields!");
        return;
    }
    
    setStatus("⏳ Requesting wallet signature...");

    try {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount(); // Pop up MetaMask
        
        // 1. Create the connection
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // The user paying the gas
        const contract = new ethers.Contract(CONTRACT_ADDRESS, GradingABI, signer);

        // 2. Send the transaction
        const transaction = await contract.submitGrade(studentId, courseId, parseInt(score));
        
        setStatus("🚀 Transaction sent! Waiting for block confirmation...");
        
        // 3. Wait for the network to confirm it
        await transaction.wait(); 
        
        setStatus(`✅ Success! Grade permanently stored. Hash: ${transaction.hash.slice(0, 10)}...`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + (err.reason || err.message));
    }
  }

  // --- FUNCTION 2: READ FROM BLOCKCHAIN ---
  async function handleGetGrade() {
    if (!studentId || !courseId) return;
    setStatus("🔎 Searching blockchain...");

    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, GradingABI, provider);

        // Read data (no gas fee!)
        const data = await contract.getGrade(studentId, courseId);
        
        // Check if the record exists (timestamp 0 means empty)
        if (data.timestamp === 0n) {
            setStatus("⚠️ No grade found for this ID.");
            setRetrievedGrade(null);
        } else {
            setRetrievedGrade({
                student: data.studentId,
                course: data.courseId,
                score: data.score.toString(),
                lecturer: data.lecturer
            });
            setStatus("✅ Data retrieved successfully.");
        }
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error fetching grade.");
    }
  }

  // --- THE UI ---
  return (
    <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
      <div style={{ 
          maxWidth: "700px", 
          width: "100%",
          background: "white", 
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          overflow: "hidden"
      }}>
        
        {/* Header Section */}
        <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px 30px",
            textAlign: "center"
        }}>
          <h1 style={{ 
              margin: "0",
              color: "white", 
              fontSize: "32px",
              fontWeight: "700",
              letterSpacing: "1px"
          }}>
            🎓 Trusted Grading Oracle
          </h1>
          <p style={{
              margin: "10px 0 0 0",
              color: "rgba(255,255,255,0.9)",
              fontSize: "14px"
          }}>
            Secure blockchain-powered grade management
          </p>
        </div>

        {/* Form Section */}
        <div style={{ padding: "40px 30px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div>
              <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  color: "#333", 
                  fontSize: "14px",
                  fontWeight: "600"
              }}>
                Student ID
              </label>
              <input 
                placeholder="Enter student ID (e.g., STU-001)" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)} 
                style={{ 
                    width: "100%",
                    padding: "14px 16px", 
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    outline: "none",
                    transition: "all 0.3s",
                    boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              />
            </div>
            
            <div>
              <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  color: "#333", 
                  fontSize: "14px",
                  fontWeight: "600"
              }}>
                Course ID
              </label>
              <input 
                placeholder="Enter course ID (e.g., SE-302)" 
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)} 
                style={{ 
                    width: "100%",
                    padding: "14px 16px", 
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    outline: "none",
                    transition: "all 0.3s",
                    boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              />
            </div>
            
            <div>
              <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  color: "#333", 
                  fontSize: "14px",
                  fontWeight: "600"
              }}>
                Score
              </label>
              <input 
                placeholder="Enter score (0-100)" 
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)} 
                style={{ 
                    width: "100%",
                    padding: "14px 16px", 
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    outline: "none",
                    transition: "all 0.3s",
                    boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              />
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                <button 
                    onClick={handleSubmit} 
                    style={{ 
                        flex: 1, 
                        padding: "16px", 
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white", 
                        border: "none", 
                        borderRadius: "12px", 
                        cursor: "pointer", 
                        fontSize: "16px",
                        fontWeight: "600",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                        transition: "all 0.3s",
                        transform: "translateY(0)"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                    }}>
                    💾 Save Grade
                </button>
                
                <button 
                    onClick={handleGetGrade} 
                    style={{ 
                        flex: 1, 
                        padding: "16px", 
                        background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                        color: "white", 
                        border: "none", 
                        borderRadius: "12px", 
                        cursor: "pointer", 
                        fontSize: "16px",
                        fontWeight: "600",
                        boxShadow: "0 4px 15px rgba(17, 153, 142, 0.4)",
                        transition: "all 0.3s",
                        transform: "translateY(0)"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 20px rgba(17, 153, 142, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 15px rgba(17, 153, 142, 0.4)";
                    }}>
                    📖 Read Grade
                </button>
            </div>

            {status && (
                <div style={{
                    marginTop: "10px",
                    padding: "16px",
                    background: "#f8f9fa",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "15px",
                    color: "#333",
                    fontWeight: "500",
                    border: "1px solid #e0e0e0"
                }}>
                    {status}
                </div>
            )}

            {retrievedGrade && (
                <div style={{ 
                    marginTop: "20px", 
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    padding: "25px", 
                    borderRadius: "15px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                }}>
                    <h3 style={{ 
                        margin: "0 0 20px 0",
                        color: "#333",
                        fontSize: "20px",
                        fontWeight: "700"
                    }}>
                        📄 Official Record
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{
                            background: "white",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <span style={{ fontWeight: "600", color: "#667eea" }}>Student:</span>
                            <span style={{ color: "#333" }}>{retrievedGrade.student}</span>
                        </div>
                        
                        <div style={{
                            background: "white",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <span style={{ fontWeight: "600", color: "#667eea" }}>Course:</span>
                            <span style={{ color: "#333" }}>{retrievedGrade.course}</span>
                        </div>
                        
                        <div style={{
                            background: "white",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <span style={{ fontWeight: "600", color: "#667eea" }}>Score:</span>
                            <span style={{ 
                                color: "#11998e", 
                                fontWeight: "700",
                                fontSize: "18px"
                            }}>
                                {retrievedGrade.score}
                            </span>
                        </div>
                    </div>
                    
                    <div style={{
                        marginTop: "20px",
                        paddingTop: "20px",
                        borderTop: "2px solid rgba(255,255,255,0.5)"
                    }}>
                        <p style={{
                            fontSize: "12px", 
                            color: "#555", 
                            wordBreak: "break-all",
                            margin: "0",
                            lineHeight: "1.6"
                        }}>
                            <span style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
                                Signed by Lecturer:
                            </span>
                            <span style={{ fontFamily: "monospace", fontSize: "11px" }}>
                                {retrievedGrade.lecturer}
                            </span>
                        </p>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;