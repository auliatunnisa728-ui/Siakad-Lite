const jadwalHariIni = [
  { nama: "Pemrograman Web", 
    waktu: "07.45 - 09.40", 
    ruang: "Lab Komputer", 
    status: "Hari Ini" 
},
{ 
    nama: "Basic Data", 
    waktu: "10.20 - 12.45", 
    ruang: "Ruang A2", 
    status: "Hari Ini" 
},
{ 
    nama: "Jaringan Komputer", 
    waktu: "13.00 - 15.40", 
    ruang: "Lab Jaringan", 
    status: "Hari Ini" 
},
{ 
    nama: "Literasi Komputer & Digital", 
    waktu: "16.00 - 17.55", 
    ruang: "Ruang C22", 
    status: "Hari Ini" 
}
];

const daftarMatkul = [
  { kode: "PTI01", 
    nama: "Pemrograman Web", 
    sks: 2, 
    status: "Sedang Diambil", 
    dosen: "Bapak Andi, M.Kom", 
    deskripsi: "Mempelajari HTML, CSS, JavaScript dan Bootstrap." 
},
{ 
    kode: "PTI02", 
    nama: "Basic Data", 
    sks: 3, 
    status: "Lulus", 
    dosen: "Ibu Fera, M.Kom", 
    deskripsi: "Konsep database dan SQL." 
},
{ 
    kode: "PTI03", 
    nama: "Jaringan Komputer", 
    sks: 4, 
    status: "Sedang Diambil", 
    dosen: "Bapak Aulia, M.Kom", 
    deskripsi: "Dasar jaringan komputer dan Cisco." 
},
{ 
    kode: "PTI04", 
    nama: "Algoritma", 
    sks: 3, 
    status: "Lulus", 
    dosen: "Bapak Rizwan, M.Kom", 
    deskripsi: "Logika pemograman dan algoritma." 
},
{ 
    kode: "PTI05", 
    nama: "Literasi Komputer & Digital", 
    sks: 2, 
    status: "Lulus", 
    dosen: "Ibu Annisa, M.Kom", 
    deskripsi: "Software & Hardware" 
}
];

const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function(e) {
    e.preventDefault();
    const nim = document.getElementById("inputNim").value;
    const password = document.getElementById("inputPassword").value;
    const error = document.getElementById("pesanError");

    if (nim === "250212100" && password === "1234567") {
      localStorage.setItem("namaMahasiswa", "Mahasiswa");
      window.location.href = "dashboard.html";
    } else {
      error.classList.remove("d-none");
    }
  });
}

const isiTabel = document.getElementById("isiTabel");
if (isiTabel) {
  const nama = localStorage.getItem("namaMahasiswa");
  if (nama) {
    document.getElementById("namaHalaman").textContent = nama;
  }

  jadwalHariIni.forEach(function(item, index){
    isiTabel.innerHTML += `
      <tr>
        <td>${index+1}</td>
        <td>${item.nama}</td>
        <td>${item.waktu}</td>
        <td>${item.ruang}</td>
        <td><span class="badge bg-success">${item.status}</span></td>
      </tr>
    `;
  });
}

const tabelMatkul = document.getElementById("tabelMatkul");
function tampilMatkul(filter = "semua"){
  if(!tabelMatkul) return;
  tabelMatkul.innerHTML = "";
  daftarMatkul.forEach(function(item){
    if(
      filter === "semua" ||
      (filter === "lulus" && item.status==="Lulus") ||
      (filter==="proses" && item.status==="Sedang Diambil")
    ){
      tabelMatkul.innerHTML += `
      <tr>
      <td>${item.kode}</td>
      <td>${item.nama}</td>
      <td>${item.sks}</td>
      <td>${item.status}</td>
      <td>
      <button class="btn btn-primary btn-sm" onclick="lihatDetail('${item.kode}')">
      Detail
      </button>
      </td>
      </tr>
      `;
    }
  });
}

if(tabelMatkul){
  tampilMatkul();
  document.querySelectorAll("[data-filter]").forEach(function(btn){
    btn.addEventListener("click",function(){
      tampilMatkul(this.dataset.filter);
    });
  });
}

function lihatDetail(kode){
  const mk = daftarMatkul.find(item=>item.kode===kode);
  document.getElementById("judulModal").innerHTML = mk.nama;
  document.getElementById("isiModal").innerHTML=`
  <p><b>Kode :</b> ${mk.kode}</p>
  <p><b>SKS :</b> ${mk.sks}</p>
  <p><b>Status :</b> ${mk.status}</p>
  <p><b>Dosen :</b> ${mk.dosen}</p>
  <p>${mk.deskripsi}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById("modalDetail"));
  modal.show();
}

let cariMatkul = document.getElementById("cariMatkul");
if (cariMatkul) {
    cariMatkul.addEventListener("keyup", function () {
        let kataKunci = cariMatkul.value.toLowerCase();
        let baris = document.querySelectorAll("#tabelMatkul tr");
        baris.forEach(function (data) {
            let isi = data.innerText.toLowerCase();
            data.style.display = isi.includes(kataKunci) ? "" : "none";
        });
    });
}

const formData = document.getElementById("formData");
if(formData){
  formData.addEventListener("submit",function(e){
    e.preventDefault();
    const nama=document.getElementById("inputNama");
    const email=document.getElementById("inputEmail");
    const jurusan=document.getElementById("inputJurusan");
    let valid=true;

    if(nama.value==""){ nama.classList.add("is-invalid"); valid=false; }else{ nama.classList.remove("is-invalid"); }
    if(email.value==""){ email.classList.add("is-invalid"); valid=false; }else{ email.classList.remove("is-invalid"); }
    if(jurusan.value==""){ jurusan.classList.add("is-invalid"); valid=false; }else{ jurusan.classList.remove("is-invalid"); }

    if(valid){
      document.getElementById("pesanSukses").classList.remove("d-none");
      localStorage.setItem("namaMahasiswa",nama.value);
      document.getElementById("pratinjauData").classList.remove("d-none");
      document.getElementById("isiPratinjau").innerHTML=`
      <p><b>Nama :</b> ${nama.value}</p>
      <p><b>Email :</b> ${email.value}</p>
      <p><b>No HP :</b> ${document.getElementById("inputHp").value}</p>
      <p><b>Jurusan :</b> ${jurusan.value}</p>
      <p><b>Alamat :</b> ${document.getElementById("inputAlamat").value}</p>
      `;
    }
  });
}

let counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    let target = parseFloat(counter.getAttribute("data-target"));
    let angka = 0;
    let interval = setInterval(() => {
        angka += target / 50;
        if (angka >= target) { angka = target; clearInterval(interval); }
        counter.innerHTML = target % 1 !== 0 ? angka.toFixed(2) : Math.floor(angka);
    }, 30);
});