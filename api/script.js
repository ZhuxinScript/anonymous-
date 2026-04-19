export default function handler(req, res) {
    const { id, sig, ts, hwid } = req.query;
    const SECRET_KEY = "pemalang01"; // JANGAN DIUBAH (Atau samakan dengan yang di web/lua)

    // 1. Cek Parameter
    if (!id || !sig || !ts) {
        return res.status(400).send("print('Error: Missing Parameters')");
    }

    // 2. Validasi Signature (Untuk mencegah bypass link)
    // Membuat signature pembanding dari timestamp + secret
    const expectedSig = Buffer.from(ts + SECRET_KEY).toString('hex').slice(0, 16);

    if (sig !== expectedSig) {
        return res.status(401).send("print('Error 401: Unauthorized Signature!')");
    }

    // 3. Database Script (Simulasi)
    // Kamu bisa menambah ID baru di sini jika ingin memproteksi script lain
    const scriptDatabase = {
        "m77pibxv": `
            print("------------------------------------------")
            print("Successfully Authorized via ZeroTrace System")
            print("User HWID: ${hwid || 'Unknown'}")
            print("------------------------------------------")
            
            -- SCRIPT ASLI KAMU DI BAWAH INI --
            print('Script Kamu Berjalan Disini!')
        `
    };

    const targetScript = scriptDatabase[id] || "print('Error: Script ID Not Found')";

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(targetScript);
}
  
