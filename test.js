function showDetection() {
    document.querySelector('.welcome-container').style.display = 'none';
    document.querySelector('.detection-container').style.display = 'block';
  }
  
  function previewImage() {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
  
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = function () {
        const imgElement = document.getElementById('preview-img');
        imgElement.src = reader.result; // Set the source of the image to the selected file
        imgElement.style.display = 'block'; // Display the image
      };
  
      // Read the image file as a data URL
      reader.readAsDataURL(file);
    }
  }
  
  function detectDisease() { 
    // Get the selected file
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
  
    if (!file) {
      alert("Please select an image.");
      return;
    }
  
    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64Image = reader.result.split(',')[1];  // Remove the data:image part
  
      // Show loading spinner
      document.getElementById('loading-spinner').style.display = 'flex';
  
      // Send image to API
      axios({
        method: 'POST',
        url: 'https://detect.roboflow.com/leaf-detection-mfnle/1',
        params: {
          api_key: '2L6Aus4pERFUVBJfD3Nu'
        },
        data: base64Image,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(response) {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
  
        // Get disease name
        const disease = response.data.predictions[0].class;
  
        // Disease precautions map
        const diseasePrecautions = {
          "Apple_Scab": "Remove fallen leaves, ensure proper spacing for good air circulation, and apply fungicides as recommended.",
          "Black_Rot": "Remove infected plant parts, avoid overhead irrigation, and use copper-based fungicides.",
          "Cedar_apple_rust": "Remove infected leaves and fruit, use resistant varieties, and apply fungicides early in the season.",
          "Cherry_Powdery_mildew": "Prune affected areas, improve air circulation, and apply fungicides at bud break and during flowering.",
          "Corn_Cercospora_leaf_spot Gray_leaf_spot": "Practice crop rotation, remove infected crop residues, and apply fungicides during periods of high humidity.",
          "Corn_common_rust": "Plant resistant varieties, practice crop rotation, and apply fungicides during periods of high humidity.",
          "Corn_Northern_Leaf_Blight": "Plant resistant varieties, avoid planting in fields with previous infections, and apply fungicides during the growing season.",
          "Grape_Black_rot": "Remove infected plant debris, apply fungicides, and ensure proper air circulation around plants.",
          "Grape_Esca_(Black_Measles)": "Remove and destroy infected vines, avoid excessive pruning, and maintain proper vine management to improve air circulation.",
          "Grape_Leaf_blight_(Isariopsis_Leaf_Spot)": "Prune infected leaves, use fungicides, and avoid overhead watering to reduce humidity around the vines.",
          "Orange___Haunglongbing_(Citrus_greening)": "Remove infected trees, use resistant rootstocks, and control insect vectors like the Asian citrus psyllid.",
          "Peach_Bacterial_spot": "Prune infected branches, use resistant varieties, and apply copper-based fungicides.",
          "Pepper_bell___Bacterial_spot": "Remove infected plants, use resistant varieties, and apply copper-based fungicides.",
          "Potato___Early_blight": "Rotate crops, remove infected plant debris, and apply fungicides when symptoms appear.",
          "Potato___Late_blight": "Use resistant varieties, remove infected plants, and apply fungicides regularly.",
          "Squash___Powdery_mildew": "Improve air circulation, avoid overhead watering, and apply fungicides when symptoms appear.",
          "Strawberry_Leaf_scorch": "Avoid overhead watering, ensure proper drainage, and remove affected leaves to prevent spread.",
          "Tomato_Bacterial_spot": "Remove infected plants, use resistant varieties, and avoid overhead irrigation.",
          "Tomato_Early_blight": "Remove affected leaves, apply fungicides, and rotate crops.",
          "Tomato_Late_blight": "Remove infected plants, avoid overhead watering, and apply fungicides regularly."
        };
  
        // Update the result
        document.getElementById('disease-name').textContent = disease;
        document.getElementById('precautions').textContent = diseasePrecautions[disease] || "No specific precautions available for this disease.";
      })
      .catch(function(error) {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
        alert('An error occurred. Please try again.');
      });
    };
  
    reader.readAsDataURL(file);
  }
  