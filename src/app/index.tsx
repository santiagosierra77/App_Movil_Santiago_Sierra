import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);
  const [registros, setRegistros] = useState<any[]>([]);

  // Variable booleana para verificar el Reto 2 (> 10 likes)
  const esAlerta = contador > 10;

  // 1. Incrementar contador
  const incrementarContador = () => {
    const nuevoContador = contador + 1;
    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString();

    setContador(nuevoContador);

    const nuevoRegistro = {
      id: Date.now().toString(),
      numero: nuevoContador,
      hora: horaFormateada,
    };
    setRegistros([nuevoRegistro, ...registros]);
  };

  // 2. Restar contador (Reto 1)
  const restarContador = () => {
    if (contador > 0) {
      const nuevoContador = contador - 1;
      const ahora = new Date();
      const horaFormateada = ahora.toLocaleTimeString();

      setContador(nuevoContador);

      const nuevoRegistro = {
        id: Date.now().toString(),
        numero: nuevoContador,
        hora: horaFormateada,
      };
      setRegistros([nuevoRegistro, ...registros]);
    }
  };

  // 3. Reiniciar a Cero (Reto 1)
  const reiniciarContador = () => {
    setContador(0);
    setRegistros([]);
  };

  return (
    <View style={estilos.body}>
      {/* Reto 2: Si supera 10 likes, la tarjeta cambia levemente de borde o color de fondo */}
      <View style={[estilos.container, esAlerta && estilos.containerAlerta]}>
        <Text style={estilos.h1}>Interactividad con el DOM</Text>
        <Text style={estilos.description}>
          {esAlerta 
            ? "¡Meta superada! Los likes pasaron de 10 y el estilo se activó reactivamente." 
            : "Haz clic en los botones para modificar el contador y registrar los eventos en la tabla."}
        </Text>
        {/* Contador dinámico (Reto 2: Cambia a color rojo/naranja si es > 10) */}
        <Text style={[estilos.counterBox, esAlerta && estilos.counterBoxAlerta]}>
          {contador}
        </Text>

        {/* Botón Principal */}
        <TouchableOpacity style={estilos.btnClick} onPress={incrementarContador}>
          <Text style={estilos.btnText}>¡Haz Clic Aquí (+1)!</Text>
        </TouchableOpacity>

        {/* Botones del Reto 1 */}
        <View style={estilos.rowButtons}>
          <TouchableOpacity style={[estilos.btnSecondary, estilos.btnRestar]} onPress={restarContador}>
            <Text style={estilos.btnTextSecondary}>Restar (-1)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[estilos.btnSecondary, estilos.btnReset]} onPress={reiniciarContador}>
            <Text style={estilos.btnTextSecondary}>Reiniciar (0)</Text>
          </TouchableOpacity>
        </View>

        {/* Tabla de registros */}
        <View style={estilos.tableContainer}>
          <View style={estilos.tableHeader}>
            <Text style={[estilos.th, estilos.cellNumero]}>No Clic</Text>
            <Text style={[estilos.th, estilos.cellHora]}>Hora</Text>
          </View>

          <ScrollView style={estilos.tableBody}>
            {registros.map((item, index) => (
              <View
                key={item.id}
                style={[
                  estilos.tr,
                  index % 2 === 0 ? estilos.trEven : null
                ]}
              >
                <Text style={[estilos.td, estilos.cellNumero]}>{item.numero}</Text>
                <Text style={[estilos.td, estilos.cellHora]}>{item.hora}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  /* Estilo dinámico para el Reto 2 */
  containerAlerta: {
    borderColor: '#e74c3c',
    borderWidth: 2,
    backgroundColor: '#fff5f5',
  },
  h1: {
    color: '#2c3e50',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  counterBox: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
    marginVertical: 10,
  },
  /* Color dinámico del contador para el Reto 2 */
  counterBoxAlerta: {
    color: '#e74c3c',
  },
  btnClick: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnRestar: {
    backgroundColor: '#e74c3c',
  },
  btnReset: {
    backgroundColor: '#95a5a6',
  },
  btnTextSecondary: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  tableContainer: {
    width: '100%',
    maxHeight: 220,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableBody: {
    maxHeight: 170,
  },
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  trEven: {
    backgroundColor: '#fafafa',
  },
  th: {
    color: '#7f8c8d',
    fontWeight: '600',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  td: {
    color: '#333',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  cellNumero: {
    flex: 1,
  },
  cellHora: {
    flex: 1.5,
  },
});