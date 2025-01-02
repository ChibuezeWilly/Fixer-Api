import express from "express";
import fs from "fs";
import path from "path";
import url from "url";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Get current directory using import.meta.url
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse incoming JSON data

app.use(express.json());
app.use(cors());
app.use('/assets', express.static('public/assets'));

// Load the data from location.json once
const filePath = path.join(__dirname, "public", "location.json");

const readLocationData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Error reading location data");
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Route for /api/location (returns all data)
app.get("/api/locations", async (req, res) => {
  const limit = req.query._limit ? parseInt(req.query._limit) : null; 
  try {
    const data = await readLocationData();
  
    const locations = limit ? data.locations.slice(0, limit) : data.locations;

    res.status(200).json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

const holidayLoader = async (id) => {
  try {
    const res = await fetch(`https://fixer-api.onrender.com/api/locations/${id}`);
    if (!res.ok) {
      throw new Error("Location not found");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

app.get('/locations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const location = await holidayLoader(id);
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: "Error fetching location data" });
  }
});
// Specific routes for different categories based on location.json structure
app.get("/api/beach", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Beach); // Accessing the Beach key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/adventure", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.adventure); // Accessing the adventure key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/Cultural", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Cultural); // Accessing the Cultural Holidays key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/Luxury", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Luxury); // Accessing the Luxury key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/Romantic", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Romantic); // Accessing the Romantic key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/Historical", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Historical); // Accessing the Historical key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/Family", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Family); // Accessing the Family key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/Ski", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Ski); // Accessing the Ski key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/Wildlife", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.Wildlife); // Accessing the Wildlife key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});
app.get('/api/homes', async (req, res) => {
    const limit = req.query._limit ? parseInt(req.query._limit) : null;
    try {
        const data = await readLocationData();
        const homes = limit ? data.homes.slice(0, limit) : data.homes
        res.status(200).json(homes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
});


app.get("/api/travelers", async (req, res) => {
  try {
    const data = await readLocationData();
    res.status(200).json(data.travelers); // Accessing the traveler key
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
