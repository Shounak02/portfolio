import React, { useState, useEffect } from "react";
import { Modal, IconButton, Box, Typography, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { supabase } from "../supabase";

const Certificate = ({ ImgSertif }) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch public URL from Supabase Storage if ImgSertif is a file path
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!ImgSertif) return;

      // If ImgSertif already starts with http, assume it's a full URL
      if (ImgSertif.startsWith("http")) {
        setImageUrl(ImgSertif);
      } else {
        // Fetch public URL from Supabase Storage
        const { data, error } = supabase.storage
          .from("certificates-bucket") // replace with your bucket name
          .getPublicUrl(ImgSertif);

        if (error) {
          console.error("Error fetching certificate URL:", error.message);
        } else {
          setImageUrl(data.publicUrl);
        }
      }
    };

    fetchImageUrl();
  }, [ImgSertif]);

  return (
    <Box component="div" sx={{ width: "100%" }}>
      {/* Thumbnail Container */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
            "& .overlay": { opacity: 1 },
            "& .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
            "& .certificate-image": {
              filter: "contrast(1.05) brightness(1) saturate(1.1)",
            },
          },
        }}
      >
        {/* Certificate Image */}
        <img
          className="certificate-image"
          src={imageUrl}
          alt="Certificate"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
            transition: "filter 0.3s ease",
          }}
          onClick={handleOpen}
        />

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            transition: "all 0.3s ease",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={handleOpen}
        >
          {/* Hover Content */}
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              opacity: 0,
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            <FullscreenIcon
              sx={{ fontSize: 40, mb: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              View Certificate
            </Typography>

            {/* View Original Button */}
			{imageUrl && (
			<Box mt={1}>
				<a
				href={imageUrl}
				target="_blank"
				rel="noopener noreferrer"
				onClick={(e) => e.stopPropagation()} // prevent modal from opening
				style={{
					padding: "8px 16px",
					background: "rgba(139, 92, 246, 0.2)", // semi-transparent
					border: "1px solid rgba(139, 92, 246, 0.5)",
					borderRadius: "20px",
					color: "white",
					fontSize: "0.75rem",
					fontWeight: 500,
					cursor: "pointer",
					transition: "0.3s",
					backdropFilter: "blur(6px)", // the glassy blur effect
					textDecoration: "none",
					display: "inline-block",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)";
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
				}}
				>
				View Original
				</a>
			</Box>
			)}

          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300, sx: { backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(5px)" } }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ position: "relative", width: "auto", maxWidth: "90vw", maxHeight: "90vh", outline: "none" }}>
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)", transform: "scale(1.1)" },
            }}
            size="large"
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>

          {/* Modal Image */}
          <img
            src={imageUrl}
            alt="Certificate Full View"
            style={{ display: "block", maxWidth: "100%", maxHeight: "90vh", margin: "0 auto", objectFit: "contain" }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
