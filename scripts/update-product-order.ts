import client from '../sanity/sanity.client';

// --- CONFIGURAZIONE ---
const typeName = 'prodotto'; // Il _type dei documenti prodotto
const titleField = 'nome'; // Il nome del campo che contiene il nome del prodotto
const orderField = 'ordine'; // Il nome del campo per l'ordinamento

// Elenco dei prodotti ordinati come da richiesta.
const prodottiOrdinati = [
    "Zuppa Ceciata", "Zuppa Nonna Dina", "Zuppa Grano Saraceno e Legumi", "Zuppa Matilde",
    "Zuppa Nerona", "Zuppa Fagiolona", "Zuppa Grastellina", "Zuppa Marolese", "Zuppa Boiardo",
    "Zuppa Legumi", "Zuppa Contadina", "Zuppa Del Montanaro", "Zuppa Burlone",
    "Risoltto ai Funghi Porcini", "Risotto allo Zafferano", "Risotto al Tartufo Nero Uncinato",
    "Fagioli Borlotti", "Fagioli Cannellini", "Fagiolo Giallorino", "Fagiolo Dolico Dall'Occhio",
    "Fagiolo Adzuki Verde", "Fagiolo Adzuki Rosso", "Fagiolo Barba Di Frate", "Fagiolo Zolfino",
    "Fagiolo Corona", "Fagiolo Diavolo Rosso", "Farina di Fagioli", "Ceci", "Farina di Ceci",
    "Ceci Neri", "Lenticchie Piccole Variegate", "Lenticchie Rosse Decorticate",
    "Lenticchie Gialle Decorticate", "Farina di Lenticchie Rosse", "Farina di Lenticchie Gialle",
    "Cicerchie", "Fave", "Favetta Sgusciata", "Piselli Interi", "Piselli Spezzati Decorticati",
    "Farina di Piselli", "Farina antichi Cinquanta Grani Fiore",
    "Farina antichi Cinquanta Grani Integrale", "Farina antichi Cinquanta Grani Semintegrale",
    "Farina Tipo 0", "Farina Tipo 1", "Farina Tipo 2", "Farina Manitoba",
    "Semola Rimacinata di Grano Duro", "Semola Rimacinata di Grano Duro varietà antica Senatore Cappelli",
    "Semola Rimacinata di Grano Duro varietà antica Saragolla",
    "Farro Decorticato in chicchi varietà antica Dicocco", "Farina di Farro",
    "Farro Decorticato varietà antica Monococco", "Farina di Farro Monococco",
    "Orzo perlato in chicchi varietà antica Mondo", "Orzo Perlato in chicchi Classico",
    "Orzo Perlato Nero in chicchi varietà antica", "Farina d'Orzo", "Farina di Segale",
    "Avena Decorticata", "Farina di avena", "Farina di Mais da Polenta varietà antica Ottofile",
    "Farina di Mais Fioretto", "Mais per Pop Corn", "Riso Carnaroli", "Riso Integrale",
    "Farina di Castagne", "Castagne Secche", "Farina di Grano Saraceno",
    "Grano Saraceno decorticato in chicchi", "Miele di Acacia", "Miele di Tiglio",
    "Miele di Millefiori", "Miele di Melata di Bosco", "Miele di Tarassaco", "Miele di Castagno",
    "Polline", "Caramelle Senza Zucchero balsamica alla Propoli", "Caramelle Miele",
    "Caramelle Miele e Zenzero", "Caramelle Miele ed Eucalipto", "Caramelle Miele e Mirtillo",
    "Caramelle Miele ed Erbe di Montagna", "Caramelle Miele Agrumi e Propoli",
    "Caramelle Miele Menta e Propoli", "Caramelle Miele Pino e Propoli",
    "Caramelle alla Propoli", "Tisana Depurativa", "Tisana Riposante", "Tisana Drenante",
    "Tisana Digestiva", "Infuso del Benessere", "Infuso Millevirtù dei Canossa",
    "Infuso Frutti di Bosco", "Infuso Ciliegie e Mirtillo", "Infuso Dolce Sonno",
    "Infuso Tiglio, Limone e Rosa Canina", "Infuso Piccoli frutti",
    "Infuso Mela, Cannella e Rosa Canina", "Infuso Zenzero e limone",
    "Infuso Sambuco, Mora e Fragola", "Aglio Bianco", "Aglio Viola", "Scalogno",
    "Cipolla dell'Amorotto", "Cipolla Dorata", "Pomodoro da Conserva",
    "Pomodoro Insalataro Cuor di Bue", "Pomodoro Datterini Rossi, Gialli, Ciliegini neri",
    "Patate Gialle", "Patate Rosse a pasta Gialla", "Patate Viola/Blu", "Zucca Violina",
    "Zucchette Ornamentali", "Noci", "Nocciole", "Marroni", "Funghi", "Funghi secchi",
    "Tartufo nero autunnale", "Tartufo bianco pregiato"
];

async function updateProductOrder() {
    console.log('🔍 Recupero dei prodotti dal database...');

    try {
        // 1. First, let's check how many products exist in total
        const totalProductsQuery = `*[_type == "prodotto"] {_id, nome}`;
        const allProducts = await client.fetch(totalProductsQuery);
        console.log(`📊 Totale prodotti nel database: ${allProducts.length}`);

        // 2. Recupera tutti i prodotti che sono nella nostra lista
        const query = `*[_type == "prodotto" && nome in $titles] {_id, nome}`;
        const params = { titles: prodottiOrdinati };
        const productsFromDB = await client.fetch(query, params);

        console.log(`🔍 Query utilizzata: ${query}`);
        console.log(`📝 Parametri: ${JSON.stringify({ titlesCount: prodottiOrdinati.length }, null, 2)}`);

        if (productsFromDB.length === 0) {
            console.warn('⚠️ Nessun prodotto trovato nel database con i nomi forniti. Controlla che il campo "nome" e il tipo "prodotto" siano corretti.');
            return;
        }

        // Creiamo una mappa per un accesso rapido: Nome -> _id
        const productMap = new Map(productsFromDB.map((p: any) => [p.nome, p._id]));

        console.log(`✅ Trovati ${productsFromDB.length} prodotti corrispondenti su ${prodottiOrdinati.length} richiesti.`);

        // 2. Applica gli aggiornamenti
        let updatedCount = 0;
        const errors: string[] = [];

        console.log(`\n🚀 Applicazione aggiornamenti...`);

        for (let i = 0; i < prodottiOrdinati.length; i++) {
            const nome = prodottiOrdinati[i];
            const productId = productMap.get(nome);

            if (productId && typeof productId === 'string') {
                try {
                    // SOLO aggiornamento del campo ordine - nessun altro campo viene modificato
                    await client
                        .patch(productId)
                        .set({ ordine: i + 1 }) // SOLO il campo ordine viene aggiornato
                        .commit();

                    updatedCount++;
                    console.log(`📝 ✅ Aggiornato: "${nome}" -> ordine: ${i + 1}`);
                } catch (error) {
                    const errorMsg = `Errore aggiornando "${nome}": ${error}`;
                    errors.push(errorMsg);
                    console.error(`📝 ❌ ${errorMsg}`);
                }
            } else {
                // Se un prodotto nella lista non è stato trovato nel DB, avvisa l'utente
                const warnMsg = `Prodotto non trovato nel database: "${nome}"`;
                errors.push(warnMsg);
                console.warn(`⚠️ ATTENZIONE: ${warnMsg}`);
            }
        }

        if (updatedCount === 0) {
            console.log('ℹ️ Nessuna modifica applicata.');
            return;
        }

        console.log(`\n🎉 Operazione completata!`);
        console.log(`📊 ${updatedCount} documenti sono stati aggiornati.`);

        // 4. Mostra un riepilogo finale
        console.log(`\n📋 RIEPILOGO:`);
        console.log(`   • Prodotti aggiornati: ${updatedCount}`);
        console.log(`   • Prodotti non trovati: ${prodottiOrdinati.length - updatedCount}`);
        console.log(`   • Ordine assegnato: da 1 a ${updatedCount}`);

    } catch (error) {
        console.error('\n❌ Errore durante l\'applicazione delle modifiche:', error);
    }
}

// Funzione principale con gestione degli errori
async function main() {
    console.log('🚀 Avvio script di aggiornamento ordine prodotti...\n');

    try {
        await updateProductOrder();
    } catch (error) {
        console.error('❌ Errore generale:', error);
        process.exit(1);
    }

    console.log('\n✅ Script completato.');
}

// Esegui la funzione solo se questo file viene eseguito direttamente
if (require.main === module) {
    main();
}

export { updateProductOrder }; 