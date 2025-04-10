import { DocumentList } from '@/components/document/DocumentList';
import { DocumentViewer } from '@/components/document/DocumentViewer';
import { AnnotationPanel } from '@/components/annotation/AnnotationPanel';
import { documents, knowledgeUnitSchemas } from './utils/mockData';
import { useDocuments, useHighlighting } from './hooks';
import './App.css';

function App() {
  const {
    allDocuments,
    selectedDocumentId,
    selectedDocument,
    knowledgeUnits,
    highlights,
    selectDocument,
    updateKnowledgeUnits
  } = useDocuments(documents);

  const {
    activeHighlightingField,
    activeHighlightIds,
    toggleHighlighting,
    handleTextSelect,
    handleHighlightClick,
    addHighlight
  } = useHighlighting(knowledgeUnits, highlights, updateKnowledgeUnits);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <DocumentList
          {...{
              allDocuments,
              selectedDocumentId
          }}
        onSelectDocument={selectDocument}
      />
      <DocumentViewer
          {...{
              highlights,
              activeHighlightIds,
              selectedDocument
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
        documentId={selectedDocumentId}
        onUpdateKnowledgeUnits={updateKnowledgeUnits}
        onToggleHighlighting={toggleHighlighting}
        onAddHighlight={addHighlight}
      />
    </div>
  );
}

export default App;
