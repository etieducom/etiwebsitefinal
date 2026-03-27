'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Award, CheckCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const defaultCertificationPartners = [
  { id: '1', name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png', type: 'certification' },
  { id: '2', name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/200px-Adobe_Systems_logo_and_wordmark.svg.png', type: 'certification' },
  { id: '3', name: 'EC-Council', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/EC-Council_Logo.svg/200px-EC-Council_Logo.svg.png', type: 'certification' },
  { id: '4', name: 'Tally', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Tally_-_Logo.svg/200px-Tally_-_Logo.svg.png', type: 'certification' },
  { id: '5', name: 'Certiport', logo: 'https://certiport.pearsonvue.com/getattachment/6b4f3df4-f7ab-4961-8461-7e2f4d7abf85/certiport-logo.png', type: 'certification' },
];

const defaultPlacementPartners = [
  { id: '1', name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/200px-Tata_Consultancy_Services_Logo.svg.png', type: 'placement' },
  { id: '2', name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/200px-Infosys_logo.svg.png', type: 'placement' },
  { id: '3', name: 'Wipro', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/200px-Wipro_Primary_Logo_Color_RGB.svg.png', type: 'placement' },
  { id: '4', name: 'HCL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/HCL_Technologies_logo.svg/200px-HCL_Technologies_logo.svg.png', type: 'placement' },
  { id: '5', name: 'Tech Mahindra', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tech_Mahindra_New_Logo.svg/200px-Tech_Mahindra_New_Logo.svg.png', type: 'placement' },
];

export default function PartnersSection() {
  const [certificationPartners, setCertificationPartners] = useState(defaultCertificationPartners);
  const [placementPartners, setPlacementPartners] = useState(defaultPlacementPartners);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${API_URL}/api/partners`);
        if (response.ok) {
          const data = await response.json();
          const certPartners = data.filter(p => p.type === 'certification');
          const placePartners = data.filter(p => p.type === 'placement');
          if (certPartners.length > 0) setCertificationPartners(certPartners);
          if (placePartners.length > 0) setPlacementPartners(placePartners);
        }
      } catch (error) {
        console.log('Using default partners');
      }
    };
    fetchPartners();
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container-main">
        {/* Certification Partners */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-gray-900">Certification Partners</h3>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {certificationPartners.map((partner) => (
                <div 
                  key={partner.id}
                  className="flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={48}
                      className="h-10 w-auto object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-gray-600 font-semibold">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Placement Partners */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-gray-900">Our Students Work At</h3>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {placementPartners.map((partner) => (
                <div 
                  key={partner.id}
                  className="flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={48}
                      className="h-10 w-auto object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-gray-600 font-semibold">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
