export const querys ={
    getAllProducts: 'SELECT * FROM Contacts',
    createNewProduct: 'INSERT INTO Products (Name, Description, Quantity) VALUES (@namex, @descriptionx, @quantityx)',
    getProductById: 'SELECT * FROM Products WHERE Id = @idx',
    deleteProductById: 'DELETE FROM Products WHERE Id = @idx',
    getTotalProducts: 'SELECT COUNT(*) FROM Products',
    updateProductById: 'UPDATE Products SET Name = @namex, Description = @descriptionx, Quantity = @quantityx WHERE Id = @idx'
}