const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
      retryWrites: true,
      serverSelectionTimeoutMS: 30000,
      w: '1', 
    })

    const connection = conn.connection
    console.log(`MongoDB Connected: ${connection.host}`.cyan.underline)
    
    // Check replica set status
    try {
      const adminDb = connection.db.admin()
      const status = await adminDb.command({ replSetGetStatus: 1 })
      
      if (status && status.set) {
        console.log(`✓ Replica Set Detected: ${status.set}`.green.underline)
        console.log(`  Members: ${status.members.map(m => `${m.name} (${m.stateStr})`).join(', ')}`.green)
      }
    } catch (err) {
      // If replSetGetStatus fails, we're not in a replica set or it's not initialized
      if (err.codeName === 'NotYetInitialized') {
        console.log('⚠ Warning: Replica set not yet initialized'.yellow.underline)
      } else if (err.message && err.message.includes('not running with --replSet')) {
        console.log('⚠ Warning: MongoDB not running with --replSet option'.yellow.underline)
      } else {
        console.log(`⚠ Could not verify replica set: ${err.message}`.yellow)
      }
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
