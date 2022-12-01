function SanPham(tenSP, gia, manHinh, camSau, camTruoc, img, moTa, loaiSP){
    this.name = tenSP;
    this.price = gia;
    this.screen = manHinh;
    this.backCamera = camSau,
    this.frontCamera = camTruoc,
    this.img = img;
    this.desc = moTa;
    this.type = loaiSP;
}