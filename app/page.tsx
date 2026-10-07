'use client';

import React, { useState } from 'react';
import { TeacherUser, QuestionItem, WorksheetConfig, StudentHintCards, VisualGuide } from '@/lib/types';
import { INITIAL_QUESTIONS, INITIAL_WORKSHEET_CONFIG, DEFAULT_TEACHER } from '@/lib/sampleData';
import { CURRICULUM_DATA } from '@/lib/curriculum';
import { Navbar } from '@/components/Navbar';
import { WorkshopPanel } from '@/components/WorkshopPanel';
import { A4Preview } from '@/components/A4Preview';
import { EditQuestionModal } from '@/components/EditQuestionModal';
import { HintCardsModal } from '@/components/HintCardsModal';
import { VisualGuideModal } from '@/components/VisualGuideModal';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<TeacherUser>(DEFAULT_TEACHER);
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [worksheetConfig, setWorksheetConfig] = useState<WorksheetConfig>(INITIAL_WORKSHEET_CONFIG);

  // Modals state
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [hintModal, setHintModal] = useState<{ question: QuestionItem; hints: StudentHintCards } | null>(null);
  const [visualModal, setVisualModal] = useState<{ question: QuestionItem; guide: VisualGuide } | null>(null);

  const handleUpdateTeacher = (user: TeacherUser) => {
    setCurrentUser(user);
    setWorksheetConfig((prev) => ({
      ...prev,
      teacherName: `${user.fullName} (${user.title})`,
      schoolName: user.school,
    }));
  };

  // Apply a preset template from navbar
  const handleApplyPresetTemplate = (grade: string, unitCode: string, title: string) => {
    const gradeData = CURRICULUM_DATA[grade];
    if (!gradeData) return;

    setWorksheetConfig((prev) => ({
      ...prev,
      grade: grade as any,
      title: title || `${grade}. Sınıf Matematik Çalışması`,
      kazanimCode: unitCode,
      subject: 'Matematik',
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900">
      {/* Top Navigation */}
      <Navbar
        teacher={currentUser}
        config={worksheetConfig}
        onUpdateTeacher={handleUpdateTeacher}
        onApplyPresetTemplate={handleApplyPresetTemplate}
      />

      {/* Main Split Layout: Left Workshop (40%), Right A4 Preview (60%) */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-4rem)]">
        {/* Left Column: Workshop Controls & Question Management */}
        <div className="no-print lg:col-span-5 xl:col-span-5 h-full overflow-hidden flex flex-col">
          <WorkshopPanel
            questions={questions}
            config={worksheetConfig}
            onUpdateQuestions={setQuestions}
            onUpdateConfig={setWorksheetConfig}
            onOpenEditModal={(q) => setEditingQuestion(q)}
            onOpenHintModal={(q, hints) => setHintModal({ question: q, hints })}
            onOpenVisualModal={(q, guide) => setVisualModal({ question: q, guide })}
          />
        </div>

        {/* Right Column: Instant Live A4 Sheet Preview */}
        <div className="lg:col-span-7 xl:col-span-7 h-full overflow-hidden flex flex-col">
          <A4Preview
            questions={questions}
            config={worksheetConfig}
            onUpdateConfig={setWorksheetConfig}
          />
        </div>
      </main>

      {/* Modals */}
      {editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          onSave={(updated) => {
            setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
          }}
          onClose={() => setEditingQuestion(null)}
        />
      )}

      {hintModal && (
        <HintCardsModal
          question={hintModal.question}
          hints={hintModal.hints}
          onClose={() => setHintModal(null)}
        />
      )}

      {visualModal && (
        <VisualGuideModal
          question={visualModal.question}
          guide={visualModal.guide}
          onClose={() => setVisualModal(null)}
        />
      )}
    </div>
  );
}
