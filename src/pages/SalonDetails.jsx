import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button, CircularProgress } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SalonDetails = () => {
  const { salonId } = useParams();
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const servicesResponse = await axios.get(`http://localhost:4000/api/getAllServices/${salonId}`);
        setServices(servicesResponse.data);
  
        const subServicesData = [];
  
        for (const service of servicesResponse.data) {
          const subServicesResponse = await axios.get(`http://localhost:4000/api/getAllSubServices/${salonId}/${service._id}`);
          subServicesData.push({ serviceId: service._id, subServices: subServicesResponse.data });
        }
  
        setSubServices(subServicesData);
      } catch (error) {
        console.error('Error fetching services or subservices:', error);
      }
  
      setLoading(false);
    };
  
    fetchData();
  }, [salonId]);

  // Helper function to get subservices for a specific service
  const getSubServicesForService = (serviceId) => {
    const serviceData = subServices.find(item => item.serviceId === serviceId);
    return serviceData ? serviceData.subServices : [];
  };

  const handleBookNow = (serviceId, subServiceId) => {
    console.log('Booking appointment...', { serviceId, subServiceId });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Salon Details
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {services.map((service) => (
            <Accordion key={service._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${service._id}-content`}
                id={`panel-${service._id}-header`}
              >
                <Typography variant="h6">{service.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" gutterBottom>
                  Subservices:
                </Typography>

                {/* Display subservices for the current service */}
                {getSubServicesForService(service._id).length > 0 ? (
                  getSubServicesForService(service._id).map((subService) => (
                    <Box 
                      key={subService._id} 
                      sx={{ 
                        marginBottom: 2,
                        padding: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6">{subService.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Price: ₹{subService.price}
                          </Typography>
                        </Box>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          size="small"
                          onClick={() => handleBookNow(service._id, subService._id)}
                        >
                          Book Now
                        </Button>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                    No subservices available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </Box>
  );
};

export default SalonDetails;