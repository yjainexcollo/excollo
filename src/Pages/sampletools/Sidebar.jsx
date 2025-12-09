import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Typography, IconButton, List, ListItem, ListItemText, ListItemIcon, Divider, CircularProgress, Alert } from '@mui/material';
import { FileText, Download, Delete, Copy, RotateCcw, X, Folder } from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalFiles: 0, formattedTotalSize: '0 Bytes' });
  const [refreshing, setRefreshing] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState(new Set());

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with actual API
      const mockResponse = {
        files: [],
        totalFiles: 0,
        formattedTotalSize: '0 Bytes'
      };
      
      setFiles(mockResponse.files || []);
      setStats({
        totalFiles: mockResponse.totalFiles || 0,
        formattedTotalSize: mockResponse.formattedTotalSize || '0 Bytes'
      });
    } catch (err) {
      console.error('Failed to fetch files:', err);
      setError('Failed to load files');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchFiles();
    setRefreshing(false);
  }, [fetchFiles]);

  const handleDownload = useCallback(async (file) => {
    if (!file.downloadUrl) {
      setError('No download URL available for this file');
      return;
    }
    try {
      const link = document.createElement('a');
      link.href = file.downloadUrl;
      link.download = file.filename.replace(/\.pdf$/i, '.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
      setError('Download failed');
    }
  }, []);

  const handleFileClick = useCallback((file) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDelete = useCallback(async (file) => {
    if (!confirm(`Are you sure you want to delete "${file.filename}"?`)) {
      return;
    }

    setDeletingFiles(prev => new Set([...prev, file.id]));

    try {
      // Mock delete - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from local state
      setFiles(prev => prev.filter(f => f.id !== file.id));
      setStats(prev => ({
        totalFiles: prev.totalFiles - 1,
        formattedTotalSize: prev.formattedTotalSize
      }));
      
    } catch (err) {
      console.error('Failed to delete file:', err);
      setError('Failed to delete file');
    } finally {
      setDeletingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  }, []);

  // Load files on component mount
  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen, fetchFiles]);

  // Auto-refresh every 30 seconds when sidebar is open
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      fetchFiles();
    }, 30000);

    return () => clearInterval(interval);
  }, [isOpen, fetchFiles]);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'fixed',
          top: 120,
          right: 16,
          zIndex: 1000,
          backgroundColor: isOpen ? '#ef4444' : '#3b82f6',
          color: 'white',
          width: 48,
          height: 48,
          '&:hover': {
            backgroundColor: isOpen ? '#dc2626' : '#2563eb',
          },
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        title={isOpen ? 'Close Files' : 'View Files'}
      >
        {isOpen ? <X size={24} /> : <Folder size={24} />}
      </IconButton>

      {/* Sidebar Overlay */}
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1200,
          }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 384, // 96 * 4 = 384px
          backgroundColor: '#000',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          zIndex: 1300,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            color: 'white',
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
              📁 PDF Files
            </Typography>
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                '&:disabled': { opacity: 0.5 },
              }}
              title="Refresh files"
            >
              {refreshing ? <CircularProgress size={20} color="inherit" /> : <RotateCcw size={20} />}
            </IconButton>
          </Box>
          
          <Box sx={{ fontSize: 14, opacity: 0.9 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <span>Total Files:</span>
              <span style={{ fontWeight: 600 }}>{stats.totalFiles}</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Size:</span>
              <span style={{ fontWeight: 600 }}>{stats.formattedTotalSize}</span>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2, color: '#fff' }}>
          {loading && !refreshing && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={32} sx={{ mr: 2, color: '#fff' }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>Loading files...</Typography>
            </Box>
          )}

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              action={
                <Button color="inherit" size="small" onClick={handleRefresh}>
                  Try Again
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {!loading && !error && files.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4, color: 'rgba(255,255,255,0.7)' }}>
              <FileText size={64} style={{ opacity: 0.3, marginBottom: 16, color: '#fff' }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: '#fff' }}>
                No files found
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Upload a PDF to get started
              </Typography>
            </Box>
          )}

          {/* Files List */}
          <List sx={{ p: 0 }}>
            {files.map((file) => (
              <ListItem
                key={file.id}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .file-actions': {
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => handleFileClick(file)}
              >
                <ListItemIcon>
                  <FileText size={20} color="#10b981" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#fff' }}>
                      {file.filename}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Size: {file.formattedSize} • Date: {file.formattedDate}
                      </Typography>
                      {file.jobId && (
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
                          Job ID: {file.jobId.slice(-8)}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <Box
                  className="file-actions"
                  sx={{
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    display: 'flex',
                    gap: 0.5,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file);
                    }}
                    sx={{ color: '#3b82f6' }}
                    title="Download"
                  >
                    <Download size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(file.id);
                    }}
                    sx={{ color: '#6b7280' }}
                    title="Copy File ID"
                  >
                    <Copy size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file);
                    }}
                    disabled={deletingFiles.has(file.id)}
                    sx={{ color: '#ef4444' }}
                    title="Delete File"
                  >
                    {deletingFiles.has(file.id) ? (
                      <CircularProgress size={16} />
                    ) : (
                      <Delete size={16} />
                    )}
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.1)', p: 2, backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', display: 'block' }}>
            Files are stored in MongoDB GridFS
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', display: 'block', mt: 0.5 }}>
            Auto-refreshes every 30 seconds
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
