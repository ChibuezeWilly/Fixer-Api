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
app.get("/api/locations/:id", async (req, res) => {
    try {
        const data = await readLocationData();
        const packageData = data.locations.find(pkg => pkg.id === req.params.id);
        if (!packageData) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json(packageData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching package data" });
    }
});

app.get("/api/Beach", async (req, res) => {
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

// Your existing POST request handler
app.post("/api/travelers", async (req, res) => {
  try {
    const { name, email, phone, address, travelers } = req.body;
    console.log(name, email, phone, address, travelers);
    res.status(200).json({ message: "Traveler data received successfully!" });
  } catch (err) {
    console.error("Error processing traveler data:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
