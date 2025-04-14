import { documents, knowledgeUnitSchemas } from './utils/mockData';
import { useDocuments, useHighlighting } from './hooks';

import { DocumentList } from '@/components/document/DocumentList';
import { DocumentViewer } from '@/components/document/DocumentViewer';
import { AnnotationPanel } from '@/components/annotation/AnnotationPanel';
import './styles/index.css';

function App() {
  const {
    allDocuments,
    selectedDocument,
    knowledgeUnits,
    highlights,
    onSelectDocument,
    updateKnowledgeUnits,
  } = useDocuments(documents);

  const {
    activeHighlightingField,
    activeHighlightIds,
    toggleHighlighting,
    handleTextSelect,
    handleHighlightClick,
    addHighlight,
  } = useHighlighting(knowledgeUnits, highlights, updateKnowledgeUnits);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <DocumentList
        {...{
          allDocuments,
          selectedDocument,
          onSelectDocument,
        }}
        isHighlightingActive={!!activeHighlightingField}
      />
      <DocumentViewer
        {...{
          highlights,
          activeHighlightIds,
          selectedDocument,
        }}
        onTextSelect={handleTextSelect}
        onHighlightClick={handleHighlightClick}
        isHighlightingActive={!!activeHighlightingField}
      />
      <AnnotationPanel
        {...{
          activeHighlightingField,
          knowledgeUnitSchemas,
          knowledgeUnits,
        }}
        documentId={selectedDocument?.id}
        onUpdateKnowledgeUnits={updateKnowledgeUnits}
        onToggleHighlighting={toggleHighlighting}
        onAddHighlight={addHighlight}
      />
    </div>
  );
}

export default App;
