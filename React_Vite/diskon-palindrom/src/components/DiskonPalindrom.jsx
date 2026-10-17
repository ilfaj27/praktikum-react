import { useState } from 'react';
import './DiskonPalindrom.css';

function DiskonPalindrom() {
    const [harga, setHarga] = useState('');
    const [nama, setNama] = useState('');
    const [hasil, setHasil] = useState(null);

    const hadleHitung = (e) => {
        e.preventDefault();

        const totalHarga = Number(harga);
        const namaBersih = nama.trim();

        if (
            harga === '' ||
            !Number.isFinite(totalHarga) ||
            totalHarga <= 0 ||
            namaBersih === ''
        ) {
            alert('Masukkan harga dan nama pelanggan dengan benar!');
            return;
        }

        // Mengabaikan spasi dan huruf besar/kecil
        const namaNormal = namaBersih
            .replace(/\s+/g,'')
            .toLowerCase();

        // Mengecek apakah nama merupakan palindrom
        const namaTerbalik = [...namaNormal].reverse().join('');
        const isPalindrom =
            namaNormal.length >= 3 &&
            namaNormal === namaTerbalik;
            
        // Menghitung karakter unik tanpa spasi
        const karakterUnik = new Set(namaNormal);
        const jumlahKarakterUnik = karakterUnik.size;
        
        // Menentukan diskon
        let diskon;

        if (isPalindrom) {
            diskon = 25;    
        } else {
            diskon = jumlahKarakterUnik;
        }

        const hargaAkhir =
            totalHarga - (totalHarga * diskon / 100);

        setHasil({
            status: isPalindrom ? 'Palindrom' : 'Bukan Palindrom',
            jumlahKarakterUnik,
            diskon,
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
        <div className="palindrom-container">
            <h1>Program Diskon Palindrom Nama</h1>
            <p className="deskripsi">
                Cek nama pelanggan untuk menentukan diskon belanja.
            </p>

            <form onSubmit={hadleHitung}>
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
                    placeholder="Contoh: Anna"
                    required
                />

                <button type="submit">Cek & Hitung</button>    
            </form>

            {hasil && (
                <div className="hasil-palindrom">
                    <h2>Hasil Perhitungan</h2>

                    <p>
                        Status Nama:
                        <strong>{hasil.status}</strong>
                    </p>

                    <p>
                        Jumlah Karakter Unik:
                        <strong>{hasil.jumlahKarakterUnik}</strong>
                    </p>

                    <p>
                        Persentase Diskon:
                        <strong>{hasil.diskon}%</strong>
                    </p>

                    <p className="harga-akhir">
                        Harga Pembelian Setalah Diskon:
                        <strong>{rupiah(hasil.hargaAkhir)}</strong>
                    </p>
                </div>
            )}
        </div>
    );    
}

export default DiskonPalindrom;