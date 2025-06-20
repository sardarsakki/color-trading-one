import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  IconButton,
  Alert,
  Container,
  Paper
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  QrCode as QrCodeIcon
} from '@mui/icons-material';

const PaymentPage = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [utrNumber, setUtrNumber] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const upiId = 'merchant@paytm';
  const amountToPay = 200;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle UTR input change
  const handleUtrChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 12) {
      setUtrNumber(value);
    }
  };

  // Handle copy UPI ID
  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    setShowSuccessMessage(true);
    setUtrNumber('');
    setTimeout(() => setShowSuccessMessage(false), 10000);
  };

  // Check if UTR is valid (12 digits)
  const isUtrValid = utrNumber.length === 12;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Amount and Timer Section */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
            Amount to pay: ₹{amountToPay}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: timeLeft < 60 ? 'error.main' : 'text.secondary',
              fontWeight: 'medium'
            }}
          >
            Time remaining: {formatTime(timeLeft)}
          </Typography>
        </Box>

        {/* QR Code Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: 200,
                backgroundColor: 'grey.100',
                borderRadius: 1,
                mb: 2
              }}
            >
              <QrCodeIcon sx={{ fontSize: 120, color: 'grey.600' }} />
            </Box>
            <Typography variant="body2" color="error" sx={{ fontWeight: 'medium' }}>
              Do not use same QR to pay multiple times
            </Typography>
          </CardContent>
        </Card>

        {/* OR Divider */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'background.paper',
              px: 2,
              color: 'text.secondary'
            }}
          >
            OR
          </Typography>
        </Box>

        {/* UPI ID Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            UPI ID
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 1,
              px: 2,
              py: 1
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1, fontFamily: 'monospace' }}>
              {upiId}
            </Typography>
            <IconButton onClick={handleCopyUpiId} size="small" color="primary">
              <CopyIcon />
            </IconButton>
          </Box>
          {copySuccess && (
            <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
              UPI ID copied to clipboard!
            </Typography>
          )}
        </Box>

        {/* Divider */}
        <Divider sx={{ mb: 3 }} />

        {/* UTR Input Section */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Enter 12 digit UTR number"
            value={utrNumber}
            onChange={handleUtrChange}
            placeholder="123456789012"
            helperText={`${utrNumber.length}/12 digits`}
            inputProps={{ 
              maxLength: 12,
              pattern: '[0-9]*',
              inputMode: 'numeric'
            }}
            error={utrNumber.length > 0 && utrNumber.length < 12}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!isUtrValid}
          sx={{ mb: 2, py: 1.5 }}
        >
          Submit Payment
        </Button>

        {/* Success Message */}
        {showSuccessMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Please wait if you deposited money, it will be added in your wallet as soon as possible. Thank you!
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentPage;