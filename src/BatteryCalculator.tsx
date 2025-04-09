import React, { useState } from "react";

type Equipment = {
  name: string;
  power: number;
  quantity: number;
  hours: number;
};

const BatteryCalculator: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    { name: "", power: 0, quantity: 1, hours: 1 },
  ]);
  const [autonomy, setAutonomy] = useState(1);
  const [batteryCapacity, setBatteryCapacity] = useState(200);

  const handleChange = (
    index: number,
    field: keyof Equipment,
    value: string | number
  ) => {
    const newList = [...equipmentList];
    newList[index][field] = typeof value === "string" ? Number(value) : value;
    setEquipmentList(newList);
  };

  const addEquipment = () => {
    setEquipmentList([
      ...equipmentList,
      { name: "", power: 0, quantity: 1, hours: 1 },
    ]);
  };

  const totalWh = equipmentList.reduce(
    (sum, item) => sum + item.power * item.quantity * item.hours,
    0
  );

  const dailyWh = totalWh;
  const totalWhWithAutonomy = dailyWh * autonomy;
  const batteriesNeeded = totalWhWithAutonomy / (batteryCapacity * 12); // considerando 12V por bateria

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Calculadora Solar Off-grid</h1>

      {equipmentList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 gap-4 mb-4 bg-white p-4 rounded-xl shadow"
        >
          <input
            type="text"
            placeholder="Nome do equipamento"
            className="col-span-2 border rounded p-2"
            value={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Potência (W)"
            className="border rounded p-2"
            value={item.power}
            onChange={(e) => handleChange(index, "power", e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            className="border rounded p-2"
            value={item.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
          />
          <input
            type="number"
            placeholder="Horas/dia"
            className="border rounded p-2"
            value={item.hours}
            onChange={(e) => handleChange(index, "hours", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addEquipment}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Adicionar equipamento
      </button>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Dias de autonomia:</label>
        <input
          type="number"
          value={autonomy}
          onChange={(e) => setAutonomy(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Capacidade da bateria (Ah):</label>
        <input
          type="number"
          value={batteryCapacity}
          onChange={(e) => setBatteryCapacity(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="bg-green-100 p-4 rounded-xl shadow">
        <p className="text-lg">
          <strong>Consumo diário:</strong> {dailyWh.toFixed(2)} Wh
        </p>
        <p className="text-lg">
          <strong>Energia necessária com autonomia:</strong> {totalWhWithAutonomy.toFixed(2)} Wh
        </p>
        <p className="text-lg">
          <strong>Número de baterias de {batteryCapacity}Ah (12V):</strong> {Math.ceil(batteriesNeeded)}
        </p>
      </div>
    </div>
  );
};

export default BatteryCalculator;