import QRCode from "react-qr-code";
export const QR = ()=>{
    return (
        <>
            <div style={{ height: "auto", margin: "0 auto",width: "50%" }}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value="www.youtube.com"
                    viewBox={`0 0 256 256`}
                />
            </div>
        </>
    )
}