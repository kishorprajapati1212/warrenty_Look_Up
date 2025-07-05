// src/pdfWorker.js
import * as pdfjs from "pdfjs-dist/legacy/build/pdf"; // 'legacy' ensures full API
import worker from "pdfjs-dist/legacy/build/pdf.worker?worker";

pdfjs.GlobalWorkerOptions.workerPort = new worker();

export default pdfjs;
