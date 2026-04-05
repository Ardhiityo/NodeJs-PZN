import process from "process";

process.report.reportOnFatalError = true;
process.report.reportOnSignal = true;
process.report.reportOnUncaughtException = true;

function sampleError() {
    throw new Error("Sample Error");
}

sampleError();