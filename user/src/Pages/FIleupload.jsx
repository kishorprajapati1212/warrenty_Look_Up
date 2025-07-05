import React, { useState, useEffect } from "react";
import pdfjs from "../pdfWorker";
import axios from "axios";
import chatboat from "../Actions/Chatboatreply";
import WarrantyForm from "./WarrantyForm";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import dayjs from "dayjs";
import FinalBlackHole from "../Components/FinalBlackHole";
import LoadingScreen from "../Components/LoadingScreen";
import MessagePopup from "../Components/MessagePopup";


const FileUpload = () => {
    const [textContent, setTextContent] = useState("");
    const [loading, setLoading] = useState(false);
    // const [response, setResponse] = useState(null);
    const [email, setEmail] = useState(null);
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const Gemini_api = import.meta.env.VITE_GEMINI_API_URL;
    const Gemini_key = import.meta.env.VITE_GEMINI_API_KEY;
    const [open, setOpen] = useState(false);
    const [popup, setPopup] = useState(null);

    const [response, setResponse] = useState({
        "order_date": "2025-06-01",
        "products": [
            {
                "product_name": "POCO X6 5G (Skyline Blue, 8 GB RAM 256 GB Storage)",
                "product_type": "smartphone",
                "warranty_type": "manufacturer",
                "warranty_duration": {
                    "value": 12,
                    "unit": "months"
                },
                "quantity": 1
            },
            {
                "product_name": "Noise ColorFit Pro 3 Smart Watch",
                "product_type": "smartwatch",
                "warranty_type": "manufacturer",
                "warranty_duration": {
                    "value": 12,
                    "unit": "months"
                },
                "quantity": 2
            }
        ]
    }

    );

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== "application/pdf") return;

        const fileReader = new FileReader();

        fileReader.onload = async () => {
            try {
                const typedarray = new Uint8Array(fileReader.result);
                const pdf = await pdfjs.getDocument({ data: typedarray }).promise;

                let allText = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const textItems = content.items.map((item) => item.str);
                    allText += textItems.join(" ") + "\n\n";
                }

                setTextContent(allText);
            } catch (err) {
                console.error("Error reading PDF:", err);
            }
        };

        fileReader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await chatboat({ Gemini_api, Gemini_key, textContent });
                setResponse(response)
                setOpen(true)
            } catch (err) {
                console.error("Error sending data to backend:", err);
            } finally {
                setLoading(false);
            }
        };

        if (textContent) {
            fetchData();
        }
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            // setIsLogin(true);
            setEmail(storedEmail);
        }
    }, [textContent, Backend_url, email]);

    const handleSubmit = async() => {
        setLoading(true);

        // console.log(response)
        const cleaned = {
          ...response,
          products: response.products.map(product => {
            const updatedWarranties = (product.warranties || []).map(w => {
              const warrantyEnd = dayjs(response.order_date).add(
                w.duration.value,
                w.duration.unit
              );

              return {
                ...w,
                warranty_end: warrantyEnd.format("YYYY-MM-DD"),
                warning_date: warrantyEnd.subtract(7, "day").format("YYYY-MM-DD")
              };
            });

            return {
              product_name: product.product_name,
              product_type: product.product_type,
              quantity: product.quantity,
              warranties: updatedWarranties
            };
          })
        };

        // const cleaned = {
        //     "order_date": "2024-10-06",
        //     "products": [
        //         {
        //             "product_name": "POCO X6 5G (Skyline Blue, 8 GB RAM 256 GB Storage)",
        //             "product_type": "smartphone",
        //             "quantity": 1,
        //             "warranties": [
        //                 {
        //                     "type": "manufacturer",
        //                     "duration": {
        //                         "value": 12,
        //                         "unit": "months"
        //                     },
        //                     "warranty_end": "2025-10-06",
        //                     "warning_date": "2025-09-29"
        //                 }
        //             ]
        //         }
        //     ]
        // }

        const res = await axios.post(`${Backend_url}/calender`, { email: email, data: cleaned })
        if (res.status === 200) {
            setPopup({ message: "set calender topic successful!", type: "success" });
        }
        console.log("✅ Final Cleaned Data:", cleaned);
        setOpen(false);
        setLoading(false);

    };



    return (
        <>
            <div style={{ position: "relative" }}>
                {popup && (
                    <MessagePopup
                        message={popup.message}
                        type={popup.type}
                        onClose={() => setPopup(null)}
                    />
                )}
                <FinalBlackHole />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 999,
                    }}
                >
                    <label
                        htmlFor="pdf-upload"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file && file.type === "application/pdf") {
                                handleFileChange({ target: { files: [file] } });
                            }
                        }}
                        style={{
                            width: "240px",
                            height: "240px",
                            borderRadius: "50%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(50px)",
                            border: "5.5px dashed rgba(255, 255, 255, 0.5)",
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: 20,
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            textAlign: "center",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <div style={{ fontSize: 30, marginBottom: 6 }}>📄</div>
                        Upload PDF
                        <div style={{ fontSize: 10, fontWeight: "400", marginTop: 4, opacity: 0.8 }}>
                            or drag & drop here
                        </div>
                        <input
                            id="pdf-upload"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </label>
                </div>


            </div>

            {loading && <LoadingScreen />}

            {/* <h3>Raw Extracted Text:</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{textContent}</pre> */}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
                scroll="paper"
                PaperProps={{
                    sx: {
                        backgroundColor: "rgba(255, 255, 255, 0.05)", // softer content bg
                        borderRadius: 3,
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
                        color: "#fff",
                        transform: 'translateZ(0)', // helps stabilize GPU painting
                    }
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backdropFilter: "blur(15px)", // ✅ apply blur only here
                        WebkitBackdropFilter: "blur(15px)",
                    }
                }}
            >
                <DialogContent dividers>
                    <WarrantyForm data={response} onDataChange={setResponse} />
                </DialogContent>
                <DialogActions>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen(false)}
                            sx={{
                                backgroundColor: "#e53935", color: "#fff",
                                '&:hover': { backgroundColor: "#d32f2f" }
                            }}
                        >
                            Close
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: "#43a047", color: "#fff",
                                '&:hover': { backgroundColor: "#388e3c" }
                            }}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </DialogActions>
            </Dialog>


        </>
    );
};

export default FileUpload;
