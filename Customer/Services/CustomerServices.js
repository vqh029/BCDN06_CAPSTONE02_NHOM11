function CustomerServices(){
    this.layDanhSachSP = () => {
        var promise = axios({
            method: 'get',
            url: 'https://63856645beaa6458265ec20f.mockapi.io/products'
        });
        return promise;
    }
}