'use client';

import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { WHATSAPP_MESSAGES } from '@/lib/constants';

export function WhatsAppButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-green-50 hover:bg-green-600 z-40 animate-pulse-soft"
          >
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
            >
              <Image
                src="/whatsapp_logo.svg"
                alt="WhatsApp Icon"
                width={38}
                height={38}
              />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-dovvia-900 text-white">
          <p>Chat with us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
