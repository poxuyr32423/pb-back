import mysql from "mysql2/promise";

class DataBase {
  constructor(database) {
    this.database = database;
  }

  async getPaymentHistory() {
    const conn = await mysql.createConnection(this.database);
    const [rows] = await conn.execute(`SELECT * FROM \`payments\` ORDER BY \`datetime\` DESC LIMIT 10`);
    conn.end();
    return rows;
  }

  async addPayment(
    sender_name,
    sender_card,
    receiver_name,
    receiver_card,
    amount,
    day,
    time,
    datetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
  ) {
    const conn = await mysql.createConnection(this.database);
    await conn.execute(
      `INSERT INTO \`payments\`(\`sender_name\`, \`sender_card\`, \`receiver_name\`, \`receiver_card\`, \`amount\`, \`day\`, \`time\`, \`datetime\`) VALUES ('${sender_name}', '${sender_card}', '${receiver_name}', '${receiver_card}', '${amount}', '${day}', '${time}', '${datetime}')`
    );
    conn.end();
  }
}

export default new DataBase({
  port: "3306",
  user: "gen_user",
  host: "188.225.9.103",
  database: "default_db",
  password: "cz971pwdb9"
});
