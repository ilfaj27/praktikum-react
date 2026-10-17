import { useState } from 'react';
import './DiskonKonsonan.css';

function DiskonKonsonan() {
    const [harga, setHarga] = useState('');
    const [nama, setNama] = useState('');
    const [hasil, setHasil] = useState(null);

    const handleHitung = (e) => {
        e.preventDefault();

        const totalHarga = Number(harga);
        const namaBersih = nama.trim();

        if (
            harga === '' ||
            !Number.isFinite(totalHarga) ||
            totalHarga <= 0 ||
            namaBersih === ''
        ) {
            alert("Masukkan harga dan nama pelanggan dengan benar!");
            return;
        }

        // Menghitung jumlah huruf konsonan
        const konsonan = namaBersih.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
        const jumlahKonsonan = konsonan.length;

        // Menghitung jumlah kata
        const kata = namaBersih.split(/\s+/);
        const jumlahKata = kata.length;

        // Dsikon 2% untuk setiap huruf konsonan
        let diskon = jumlahKonsonan * 2;

        // Bonus 5% jika nama lebih dari 2 kata
        if (jumlahKata > 2) {
            diskon += 5;
        }

        // Diskon maksimal 20%
        diskon = Math.min(diskon, 20);

        const potongan = totalHarga * diskon / 100;
        const hargaAkhir = totalHarga - potongan;

        setHasil({
            jumlahKonsonan,
            jumlahKata,
            diskon,
            potongan,
            hargaAkhir,
        });
    };

    const rupiah = (angka) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(angka);

    return (
        <div className="diskon-container">
            <h1>Program Diskon Huruf Konsonan</h1>
            <p className="deskripsi">
                Hitung diskon belanja berdasarkan nama pelanggan.
            </p>

            <form onSubmit={handleHitung}>
                <label htmlFor="harga">Total Harga Pembelian (Rp)</label>
                <input
                    id="harga"
                    type="number"
                    min="1"
                    step="1"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Contoh: 100000"
                    required
                />

                <label htmlFor="nama">Nama Pelanggan</label>
                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  required
                />

                <button type="submit">Hitung Diskon</button>      
            </form>

            {hasil && (
                <div className="hasil">
                    <h2>Hasil Perhitungan</h2>
                    <p>
                        Jumlah Huruf Konsonan:
                        <strong> {hasil.jumlahKonsonan}</strong>
                    </p>
                    <p>
                        Jumlah Kata:
                        <strong> {hasil.jumlahKata}</strong>
                    </p>
                    <p>
                        Persentase Diskon:
                        <strong> {hasil.diskon}%</strong>
                    </p>
                    <p>
                        Total Potongan Harga:
                        <strong> {rupiah(hasil.potongan)}</strong>
                    </p>
                    <p className="harga-akhir">
                            Harga Pembelian Setelah Diskon:
                            <strong> {rupiah(hasil.hargaAkhir)}</strong>
                    </p>
                </div>
            )}
        </div>
    );
}

export default DiskonKonsonan;