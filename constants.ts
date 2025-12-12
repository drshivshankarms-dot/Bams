import { Proff, Subject, Chapter } from './types';

export const PAYMENT_UPI_ID = "thersk@axl";
export const WHATSAPP_NUMBER = "9376884568";
export const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER}`;
export const MASTER_ACCESS_CODE = "AYU-VEDA-2024"; // Simple simulation code

// Helper to generate dummy chapters
const generateChapters = (subjectName: string, count: number): Chapter[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `ch-${subjectName}-${i}`,
    title: `Chapter ${i + 1}: Introduction to ${subjectName} Part ${i + 1}`,
    duration: `${Math.floor(Math.random() * 40 + 20)} mins`,
    videoUrl: "#",
  }));
};

// 1st Professional (5 Subjects)
const subjectsProff1: Subject[] = [
  { id: 'p1s1', name: 'Padartha Vigyan', sanskritName: 'Philosophy of Ayurveda', description: 'Fundamental principles of Ayurveda and Quantum Mechanics.', chapters: generateChapters('Padartha Vigyan', 8) },
  { id: 'p1s2', name: 'Sanskrit', sanskritName: 'Sanskritam', description: 'Language of Ayurveda texts.', chapters: generateChapters('Sanskrit', 5) },
  { id: 'p1s3', name: 'Kriya Sharir', sanskritName: 'Physiology', description: 'Human physiology in context of Dosha, Dhatu, Mala.', chapters: generateChapters('Kriya Sharir', 12) },
  { id: 'p1s4', name: 'Rachana Sharir', sanskritName: 'Anatomy', description: 'Human anatomy and dissection.', chapters: generateChapters('Rachana Sharir', 15) },
  { id: 'p1s5', name: 'Samhita Adhyayan', sanskritName: 'Classical Texts I', description: 'Study of Ashtanga Hridaya and Charaka Samhita.', chapters: generateChapters('Samhita', 10) },
];

// 2nd Professional (6 Subjects)
const subjectsProff2: Subject[] = [
  { id: 'p2s1', name: 'Dravyaguna Vigyan', sanskritName: 'Pharmacology', description: 'Study of medicinal herbs and drugs.', chapters: generateChapters('Dravyaguna', 20) },
  { id: 'p2s2', name: 'Rasa Shastra', sanskritName: 'Iatrochemistry', description: 'Mineral and metal based medicines.', chapters: generateChapters('Rasa Shastra', 12) },
  { id: 'p2s3', name: 'Roga Nidan', sanskritName: 'Pathology', description: 'Diagnostics and pathology.', chapters: generateChapters('Roga Nidan', 10) },
  { id: 'p2s4', name: 'Agada Tantra', sanskritName: 'Toxicology', description: 'Forensic medicine and toxicology.', chapters: generateChapters('Agada Tantra', 8) },
  { id: 'p2s5', name: 'Swasthavritta', sanskritName: 'Preventive Medicine', description: 'Social and preventive medicine, Yoga.', chapters: generateChapters('Swasthavritta', 10) },
  { id: 'p2s6', name: 'Charaka Samhita (P)', sanskritName: 'Classical Texts II', description: 'Advanced study of Charaka Samhita.', chapters: generateChapters('Charaka', 15) },
];

// 3rd Professional (9 Subjects - Combining some modern classifications for BAMS structure)
const subjectsProff3: Subject[] = [
  { id: 'p3s1', name: 'Kayachikitsa', sanskritName: 'Internal Medicine', description: 'General medicine and treatment.', chapters: generateChapters('Kayachikitsa', 25) },
  { id: 'p3s2', name: 'Panchakarma', sanskritName: 'Detoxification', description: 'Five procedures of purification.', chapters: generateChapters('Panchakarma', 15) },
  { id: 'p3s3', name: 'Shalya Tantra', sanskritName: 'Surgery', description: 'General surgery.', chapters: generateChapters('Shalya', 18) },
  { id: 'p3s4', name: 'Shalakya Tantra', sanskritName: 'ENT & Ophthalmology', description: 'Diseases above the clavicle.', chapters: generateChapters('Shalakya', 12) },
  { id: 'p3s5', name: 'Prasuti Tantra', sanskritName: 'Obstetrics', description: 'Pregnancy and childbirth.', chapters: generateChapters('Prasuti', 14) },
  { id: 'p3s6', name: 'Stri Roga', sanskritName: 'Gynecology', description: 'Women diseases.', chapters: generateChapters('Stri Roga', 10) },
  { id: 'p3s7', name: 'Kaumarbhritya', sanskritName: 'Pediatrics', description: 'Care of children.', chapters: generateChapters('Kaumarbhritya', 10) },
  { id: 'p3s8', name: 'Charaka Samhita (U)', sanskritName: 'Classical Texts III', description: 'Final part of Charaka Samhita.', chapters: generateChapters('Charaka Uttara', 8) },
  { id: 'p3s9', name: 'Research Methodology', sanskritName: 'Anusandhan', description: 'Medical statistics and research.', chapters: generateChapters('Research', 6) },
];

export const CURRICULUM: Proff[] = [
  { id: 1, title: 'First Professional', description: 'The Foundation of Ayurveda', subjects: subjectsProff1 },
  { id: 2, title: 'Second Professional', description: 'Pharmacology & Pathology', subjects: subjectsProff2 },
  { id: 3, title: 'Final Professional', description: 'Clinical Specializations', subjects: subjectsProff3 },
];