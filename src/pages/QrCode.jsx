import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

export default function QrCode() {
    const menuLink = `${window.location.origin}/home`;

    const handleDownload = () => {
        const canvas = document.getElementById("qr-code-canvas");
        if (canvas) {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = 60; // Size of QR code in mm
            const imgHeight = 60;
            const x = (pdfWidth - imgWidth) / 2;
            const y = (pdfHeight - imgHeight) / 2;

            // Add Title
            pdf.setFontSize(24);
            pdf.setTextColor(255, 100, 0); // Orange color
            pdf.text("Scan for Menu", pdfWidth / 2, y - 20, { align: "center" });

            // Add QR Code
            pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

            // Add Link Text
            pdf.setFontSize(12);
            pdf.setTextColor(100);
            // Link Removed as per request

            // Add Footer
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text("© 2025 Premium Menu", pdfWidth / 2, pdfHeight - 20, { align: "center" });

            pdf.save("menu-qr.pdf");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 bg-gray-900/80 backdrop-blur-xl p-10 rounded-3xl border border-orange-500/20 shadow-2xl text-center max-w-md w-full"
            >
                <div className="mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 6h2v2H6V6zm0 12h2v2H6v-2zm12-12h2v2h-2V6zM4 4h6v6H4V4zm0 12h6v6H4v-6zm12-12h6v6h-6V4z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                        Scan for Menu
                    </h1>
                    <p className="text-gray-400">Point your camera at the QR code below using your mobile device.</p>
                </div>

                <div className="bg-white p-4 rounded-xl inline-block shadow-inner mb-8">
                    <QRCodeCanvas
                        id="qr-code-canvas"
                        value={menuLink}
                        size={250}
                        level={"H"}
                        imageSettings={{
                            src: "", // You could add a logo URL here if needed
                            x: undefined,
                            y: undefined,
                            height: 24,
                            width: 24,
                            excavate: true,
                        }}
                    />
                </div>

                <button
                    onClick={handleDownload}
                    className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download as PDF
                </button>
            </motion.div>

            <p className="mt-8 text-gray-500 text-sm relative z-10">
                © 2025 Premium Menu. All Rights Reserved.
            </p>
        </div>
    );
}
