"use client";

import { QRCodeSVG } from "qrcode.react";

export function QrCode({ value, size = 104 }: { value: string; size?: number }) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      bgColor="transparent"
      fgColor="#ffffff"
      level="M"
      marginSize={0}
      title={`QR code linking to ${value}`}
    />
  );
}
