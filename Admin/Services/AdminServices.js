function AdminServices(){
    this.layDanhSachSP = () => {
        var promise = axios({
            method: 'get',
            url: 'https://63856645beaa6458265ec20f.mockapi.io/products'
        });
        return promise;
    }

    this.layChiTietSP = function (id) {
        return axios({
            method: 'get',
            url: `https://63856645beaa6458265ec20f.mockapi.io/products/${id}`
        });
    }

    this.themSP = (newSP) => {
        return axios({
            method: 'post',
            url: 'https://63856645beaa6458265ec20f.mockapi.io/products',
            data: newSP
        })
    }

    this.xoaSP = (id) => {
        return axios({
            method: 'delete',
            url: `https://63856645beaa6458265ec20f.mockapi.io/products/${id}`
            
        })
    }

    this.capNhatSP = (id, SP) => {
        return axios({
            method: 'put',
            url: `https://63856645beaa6458265ec20f.mockapi.io/products/${id}`,
            data: SP
        })
    }
}