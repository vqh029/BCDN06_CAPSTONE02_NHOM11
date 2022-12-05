function DanhSachSanPham(){
    this.mangSanPham = [];

    this.themSP = function(sp){
        this.mangSanPham.push(sp);
    }

    this.timViTriSP = function(masp){
        var viTri = -1;

        viTri = this.mangSanPham.findIndex(function(sp){
            return masp == sp.id
        });
        
        return viTri;
    }

    this.capNhatSP = function(masp){
        var viTri = this.timViTriSP(masp.id);
        if(viTri > -1){
            //tìm thấy
            dsnv.mangSanPham[viTri] = masp
        }
    }

    this.xoaSP = function(masp){
        var viTri = this.timViTriSP(masp);
        if(viTri != -1){
            this.mangSanPham.splice(viTri,1);
        }
    }

}