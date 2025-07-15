# Script di Aggiornamento Ordine Prodotti

Questo script aggiorna il campo `ordine` dei prodotti in Sanity CMS secondo una lista predefinita.

## File: `update-product-order.ts`

### Funzionalità

- Recupera tutti i prodotti dal database Sanity
- Assegna un numero di ordine progressivo (da 1 in poi) basato sulla lista predefinita
- Fornisce feedback dettagliato durante l'esecuzione
- Gestisce errori e prodotti non trovati

### Come Eseguire

1. **Posizionati nella cartella scripts:**

   ```bash
   cd scripts
   ```

2. **Esegui lo script:**
   ```bash
   npx tsx update-product-order.ts
   ```

### Cosa Fa lo Script

1. **Connessione**: Si connette al database Sanity usando la configurazione esistente
2. **Recupero**: Recupera tutti i prodotti che corrispondono ai nomi nella lista predefinita
3. **Aggiornamento**: Per ogni prodotto trovato, aggiorna il campo `ordine` con il numero progressivo
4. **Reporting**: Mostra un riepilogo dell'operazione con:
   - Numero di prodotti aggiornati
   - Elenco dei prodotti non trovati
   - Eventuali errori

### Output di Esempio

```
🚀 Avvio script di aggiornamento ordine prodotti...

🔍 Recupero dei prodotti dal database...
✅ Trovati 85 prodotti corrispondenti su 92 richiesti.

🚀 Applicazione aggiornamenti...
📝 ✅ Aggiornato: "Zuppa Ceciata" -> ordine: 1
📝 ✅ Aggiornato: "Zuppa Nonna Dina" -> ordine: 2
...
⚠️ ATTENZIONE: Prodotto non trovato nel database: "Tartufo bianco pregiato"

🎉 Operazione completata!
📊 85 documenti sono stati aggiornati.

📋 RIEPILOGO:
   • Prodotti aggiornati: 85
   • Prodotti non trovati: 7
   • Ordine assegnato: da 1 a 85

✅ Script completato.
```

### Configurazione

Lo script utilizza:

- **Tipo**: `prodotto` (documenti prodotto in Sanity)
- **Campo nome**: `nome` (campo che contiene il nome del prodotto)
- **Campo ordine**: `ordine` (campo che verrà aggiornato con il numero di ordine)

### Note Importanti

- ⚠️ Lo script modifica direttamente i dati in produzione
- 🔍 I prodotti vengono matchati per nome esatto
- 📊 L'ordine parte da 1 e va in sequenza
- 🛡️ Ogni aggiornamento è protetto da try/catch per evitare interruzioni

### Sicurezza

Lo script utilizza la configurazione Sanity esistente con token di scrittura. Assicurati di avere:

- Permessi di scrittura sul dataset
- Backup dei dati (se necessario)
- Connessione stabile durante l'esecuzione
