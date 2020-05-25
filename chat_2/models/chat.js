module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chat',{
        user_id :{
            type: DataTypes.STRING,
        },
        content :{
            type: DataTypes.STRING(1500),
        },
        to : {
            type: DataTypes.STRING,
        },
        room_name: {
            type: DataTypes.STRING,
        },
        socket_id: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true,
    });
};