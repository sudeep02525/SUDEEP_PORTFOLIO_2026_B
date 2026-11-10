import { connectToDatabase } from '../config/db.js';

// Increment visitor count by 1
export async function recordVisitor(req, res) {
  try {
    const { db } = await connectToDatabase();
    const visitors = db.collection('visitors');

    const result = await visitors.findOneAndUpdate(
      {},
      {
        $inc: { totalVisitors: 1 },
        $set: { lastUpdated: new Date() }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    );

    const totalVisitors = result?.totalVisitors ?? result?.value?.totalVisitors ?? 0;

    return res.status(200).json({
      success: true,
      totalVisitors
    });
  } catch (error) {
    console.error('Error in recordVisitor controller:', error.message || error);
    // Return 0 gracefully on connection failure or missing MONGODB_URI
    return res.status(200).json({
      success: true,
      totalVisitors: 0
    });
  }
}

// Fetch current visitor count without incrementing
export async function getVisitorCount(req, res) {
  try {
    const { db } = await connectToDatabase();
    const visitors = db.collection('visitors');

    const result = await visitors.findOne({});

    return res.status(200).json({
      success: true,
      totalVisitors: result?.totalVisitors || 0
    });
  } catch (error) {
    console.error('Error in getVisitorCount controller:', error.message || error);
    // Return 0 gracefully on connection failure or missing MONGODB_URI
    return res.status(200).json({
      success: true,
      totalVisitors: 0
    });
  }
}

