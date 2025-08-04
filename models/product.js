module.exports= (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stockQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        user_Id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        category_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'categoryId'
            }
        }
    }, {
        timestamps: true,
        tableName: 'Products'
    });

    return Product;
}