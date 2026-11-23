import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  Send,
  Paperclip,
  Plus,
  CheckCheck,
  Check,
  UserCheck,
  Clock,
  Sparkles,
  FileText,
  X,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const MessagesView: React.FC = () => {
  const {
    currentUser,
    users,
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendChatMessage,
    createNewGroup,
    teacherRequests,
    sendTeacherRequest,
    respondTeacherRequest
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chats' | 'requests'>('chats');

  // New Group Modal
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');

  // Request 1-on-1 Modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState('user-teacher-sarah');
  const [requestTopic, setRequestTopic] = useState('');
  const [requestMsg, setRequestMsg] = useState('');

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !activeConv) return;
    sendChatMessage(activeConv.id, messageInput.trim());
    setMessageInput('');
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    createNewGroup(groupName, groupDesc, ['user-teacher-sarah', 'user-teacher-david']);
    setIsNewGroupOpen(false);
    setGroupName('');
    setGroupDesc('');
  };

  const handleSendTeacherRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTopic.trim() || !requestMsg.trim()) return;
    sendTeacherRequest(selectedTeacherId, requestTopic, requestMsg);
    setIsRequestModalOpen(false);
    setRequestTopic('');
    setRequestMsg('');
  };

  const teachersList = users.filter(u => u.role === 'teacher' || u.role === 'admin');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            Messages & Communication
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Private direct messaging, language exchange groups, and 1-on-1 teacher requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentUser.role === 'student' && (
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-2xl transition-all shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-purple-700" /> Request 1-on-1 Teacher
            </button>
          )}

          <button
            onClick={() => setIsNewGroupOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> New Group
          </button>
        </div>
      </div>

      {/* Main Messaging Interface Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden h-[680px] flex">
        {/* Left Panel: Conversation List + Requests Tab */}
        <div className="w-80 border-r border-slate-100 flex flex-col shrink-0">
          {/* Tabs: Chats vs Teacher Requests */}
          <div className="p-3 border-b border-slate-100 grid grid-cols-2 gap-1 bg-slate-50">
            <button
              onClick={() => setActiveTab('chats')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'chats'
                  ? 'bg-white text-brand-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Chats ({conversations.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 text-xs font-bold rounded-xl transition-all relative ${
                activeTab === 'requests'
                  ? 'bg-white text-brand-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Requests
              {teacherRequests.filter(r => r.status === 'pending').length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-black rounded-full bg-red-500 text-white">
                  {teacherRequests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
          </div>

          {/* Tab 1: Chats List */}
          {activeTab === 'chats' && (
            <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
              {conversations.map(conv => {
                const isActive = conv.id === activeConversationId;
                const lastMsg = conv.messages[conv.messages.length - 1];

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                      isActive ? 'bg-brand-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-300"
                      />
                      {conv.type === 'group' ? (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-brand-600 border border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                          #
                        </span>
                      ) : (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border border-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-800 truncate">{conv.name}</h4>
                        {lastMsg && (
                          <span className="text-[10px] text-slate-400 shrink-0">{lastMsg.timestamp}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {lastMsg ? `${lastMsg.senderName.split(' ')[0]}: ${lastMsg.text}` : 'No messages yet'}
                      </p>
                    </div>

                    {conv.unreadCount && conv.unreadCount > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-brand-600 text-white text-[10px] font-bold shrink-0">
                        {conv.unreadCount}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Teacher Requests */}
          {activeTab === 'requests' && (
            <div className="overflow-y-auto flex-1 p-3 space-y-3">
              <p className="text-[11px] font-semibold text-slate-400">
                1-on-1 Speaking & Tutoring Inquiries
              </p>
              {teacherRequests.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-10">No pending requests.</p>
              ) : (
                teacherRequests.map(req => (
                  <div
                    key={req.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{req.studentName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        req.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-700'
                          : req.status === 'declined'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="font-semibold text-brand-700 text-[11px]">Topic: {req.topic}</p>
                    <p className="text-slate-600 italic">"{req.message}"</p>

                    {/* Teacher Action Buttons */}
                    {req.status === 'pending' && (currentUser.role === 'teacher' || currentUser.role === 'admin') && (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                        <button
                          onClick={() => respondTeacherRequest(req.id, 'accepted')}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondTeacherRequest(req.id, 'declined')}
                          className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-[11px] transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Panel: Active Conversation View */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-[#FDFDFF]">
            {/* Chat Room Header */}
            <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shadow-xs">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.avatar}
                  alt={activeConv.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-300"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {activeConv.name}
                    {activeConv.type === 'group' && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-[9px] font-extrabold uppercase">
                        Group ({activeConv.memberIds.length} members)
                      </span>
                    )}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Ready to Practice
                  </span>
                </div>
              </div>

              {activeConv.type === 'group' && (
                <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Admin: Sarah Jenkins
                </div>
              )}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {activeConv.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 items-end ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      />
                    )}

                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-xs ${
                        isMe
                          ? 'bg-brand-600 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                      }`}
                    >
                      {!isMe && (
                        <p className="font-extrabold text-[10px] text-brand-600">
                          {msg.senderName}
                        </p>
                      )}
                      <p className="leading-relaxed font-medium">{msg.text}</p>

                      {/* File attachment preview */}
                      {msg.attachmentName && (
                        <div
                          className={`mt-2 p-2 rounded-xl flex items-center gap-2 font-bold text-[10px] ${
                            isMe ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <FileText className="w-4 h-4 shrink-0" />
                          <span className="truncate">{msg.attachmentName}</span>
                        </div>
                      )}

                      <div
                        className={`text-[9px] text-right font-medium mt-1 flex items-center justify-end gap-1 ${
                          isMe ? 'text-brand-200' : 'text-slate-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-brand-200" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const demoFile = prompt('Attach a learning document / homework name:', 'Speaking_Audio_Homework.mp3');
                  if (demoFile) {
                    sendChatMessage(activeConv.id, `Uploaded assignment: ${demoFile}`, demoFile);
                  }
                }}
                className="p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                placeholder="Write your English practice message..."
                className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-800 outline-none focus:border-brand-500 focus:bg-white transition-all"
              />

              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 text-white rounded-full transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a conversation to start chatting.
          </div>
        )}
      </div>

      {/* CREATE GROUP MODAL */}
      {isNewGroupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Create English Discussion Group</h3>
              <button onClick={() => setIsNewGroupOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Group Name *</label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="e.g. IELTS Writing Band 8 Prep"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={groupDesc}
                  onChange={e => setGroupDesc(e.target.value)}
                  placeholder="Purpose of this group..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewGroupOpen(false)}
                  className="px-3.5 py-2 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST 1-ON-1 TEACHER MODAL */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Request 1-on-1 Teacher Session</h3>
              <button onClick={() => setIsRequestModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSendTeacherRequest} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Teacher</label>
                <select
                  value={selectedTeacherId}
                  onChange={e => setSelectedTeacherId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                >
                  {teachersList.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.level} Certified)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Session Topic *</label>
                <input
                  type="text"
                  required
                  value={requestTopic}
                  onChange={e => setRequestTopic(e.target.value)}
                  placeholder="e.g. Job Interview Preparation or Pronunciation"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Your Message / Questions *</label>
                <textarea
                  rows={3}
                  required
                  value={requestMsg}
                  onChange={e => setRequestMsg(e.target.value)}
                  placeholder="Explain what specific challenges you'd like to work on..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-3.5 py-2 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
