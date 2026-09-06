const fs = require('fs');
const path = require('path');

const vendorsPath = path.join(
  __dirname,
  '../data/vendors.json'
);

const vendors = JSON.parse(
  fs.readFileSync(vendorsPath, 'utf8')
);

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function calculateLocationScore(location, vendor) {
  const searchLocation = normalize(location);

  const vendorCities = Array.isArray(vendor.cities)
    ? vendor.cities
    : [];

  for (const city of vendorCities) {
    const normalizedCity = normalize(city);

    if (searchLocation === normalizedCity) {
      return 50;
    }

    if (searchLocation.includes(normalizedCity)) {
      return 50;
    }

    if (normalizedCity.includes(searchLocation)) {
      return 40;
    }
  }

  const vendorState = normalize(vendor.state);

  if (
    vendorState &&
    searchLocation.includes(vendorState)
  ) {
    return 25;
  }

  return 0;
}

function calculateCapacityScore(capacity, vendor) {
  const requestedCapacity = Number(capacity);

  const min = Number(vendor.minCapacity);
  const max = Number(vendor.maxCapacity);

  if (
    requestedCapacity >= min &&
    requestedCapacity <= max
  ) {
    return 30;
  }

  const distance =
    requestedCapacity < min
      ? min - requestedCapacity
      : requestedCapacity - max;

  return Math.max(
    0,
    Math.round(20 - distance / 10)
  );
}

function findMatchingVendors({
  location,
  capacity,
  systemType,
  projectType
}) {
  const results = vendors.map((vendor) => {
    let score = 0;

    // Location
    score += calculateLocationScore(
      location,
      vendor
    );

    // Capacity
    score += calculateCapacityScore(
      capacity,
      vendor
    );

    // System type
    if (
      systemType &&
      Array.isArray(vendor.systemTypes) &&
      vendor.systemTypes.includes(systemType)
    ) {
      score += 10;
    }

    // Project type
    if (
      projectType &&
      Array.isArray(vendor.projectTypes) &&
      vendor.projectTypes.includes(projectType)
    ) {
      score += 10;
    }

    return {
      ...vendor,
      matchScore: Math.min(
        100,
        Math.max(0, Math.round(score))
      )
    };
  });

  return results
    .filter((vendor) => vendor.matchScore >= 20)
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }

      return Number(b.rating) - Number(a.rating);
    });
}

module.exports = {
  findMatchingVendors
};